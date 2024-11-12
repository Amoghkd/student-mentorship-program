const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const pool = require('../config/db');

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

module.exports = {
  async login(req, res) {
    const { username, password } = req.body;

    try {
      // Step 1: Find user in the `users` table
      const [userResult] = await pool.query(
        'SELECT * FROM users WHERE username = ?',
        [username]
      );

      // If user is not found in the `users` table
      if (!userResult.length) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }

      const user = userResult[0];

      // Step 2: Verify the password
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }

      // Step 3: Verify user’s existence in either `mentors` or `mentees` based on role
      let profileQuery, profileParams;

      if (user.role === 'mentor') {
        profileQuery = `
          SELECT m.* FROM mentors m
          JOIN users u ON m.user_id = u.user_id
          WHERE u.user_id = ? AND u.role = 'mentor'
        `;
        profileParams = [user.user_id];
      } else if (user.role === 'mentee') {
        profileQuery = `
          SELECT m.* FROM mentees m
          JOIN users u ON m.user_id = u.user_id
          WHERE u.user_id = ? AND u.role = 'mentee'
        `;
        profileParams = [user.user_id];
      } else {
        return res.status(400).json({ error: 'Invalid role specified' });
      }

      const [profileResult] = await pool.query(profileQuery, profileParams);

      // If profile not found in `mentors` or `mentees` table
      if (!profileResult.length) {
        return res.status(401).json({ error: `Profile not found for role ${user.role}` });
      }

      // Step 4: Generate JWT token with user role and ID
      const token = jwt.sign({ userId: user.user_id, role: user.role }, JWT_SECRET, {
        expiresIn: '1h',
      });

      res.json({ token, role: user.role });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async register(req, res) {
    const { username, password, role, ...profileData } = req.body;

    try {
      const hashedPassword = await bcrypt.hash(password, 10);

      // Insert into `users` table
      const [userResult] = await pool.query(
        'INSERT INTO users (username, password, role) VALUES (?, ?, ?)',
        [username, hashedPassword, role]
      );

      const userId = userResult.insertId;

      // Insert into `mentors` or `mentees` table based on role
      if (role === 'mentor') {
        await pool.query(
          'INSERT INTO mentors (user_id, name, contact_info, expertise, availability, languages, bio) VALUES (?, ?, ?, ?, ?, ?, ?)',
          [userId, profileData.name, JSON.stringify(profileData.contact_info), JSON.stringify(profileData.expertise), profileData.availability, profileData.languages, profileData.bio]
        );
      } else if (role === 'mentee') {
        await pool.query(
          'INSERT INTO mentees (user_id, name, contact_info, interests, needs_goals, preferred_communication, location) VALUES (?, ?, ?, ?, ?, ?, ?)',
          [userId, profileData.name, JSON.stringify(profileData.contact_info), JSON.stringify(profileData.interests), profileData.needs_goals, profileData.preferred_communication, profileData.location]
        );
      } else {
        return res.status(400).json({ error: 'Invalid role specified' });
      }

      res.status(201).json({ message: 'User registered', userId });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};
