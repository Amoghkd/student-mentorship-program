// authController.js

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

      if (!profileResult.length) {
        return res.status(401).json({ error: `Profile not found for role ${user.role}` });
      }

      // Step 4: Generate JWT token
      const token = jwt.sign({ userId: user.user_id, role: user.role }, JWT_SECRET, {
        expiresIn: '1h',
      });

      // Step 5: Set token as HTTP-only cookie with SameSite set to 'Lax'
      res.cookie('authToken', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production', // Set to true in production
        sameSite: 'Lax', // Changed from 'Strict' to 'Lax'
        maxAge: 60 * 60 * 1000 // 1 hour
      });

      res.json({ message: 'Login successful', role: user.role });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async register(req, res) {
    const { username, password, role } = req.body;

    try {
      const hashedPassword = await bcrypt.hash(password, 10);

      // Insert into `users` table only
      const [userResult] = await pool.query(
        'INSERT INTO users (username, password, role) VALUES (?, ?, ?)',
        [username, hashedPassword, role]
      );

      const userId = userResult.insertId;

      // Generate a JWT token upon successful registration
      const token = jwt.sign({ userId: userId, role: role }, JWT_SECRET, {
        expiresIn: '1h',
      });

      // Set the token as an HTTP-only cookie with SameSite set to 'Lax'
      res.cookie('authToken', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production', // Set to true in production
        sameSite: 'Lax', // Changed from 'Strict' to 'Lax'
        maxAge: 60 * 60 * 1000 // 1 hour
      });

      res.status(201).json({ message: 'User registered', userId });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Optional logout function to clear the cookie
  async logout(req, res) {
    res.clearCookie('authToken', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'Lax',
    });
    res.json({ message: 'Logged out successfully' });
  }
};
