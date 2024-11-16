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

      // Log user role for debugging purposes
      console.log("User role:", user.role);

      // Step 2: Verify the password
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }

      // Step 3: Check if the user is an admin
      if (user.role === 'admin') {
        // If the user is an admin, log them in directly without JWT or additional checks
        return res.json({ message: 'Admin login successful', role: user.role });
      }

      // Step 4: Check for mentor or mentee roles and proceed with further checks
      if (user.role === 'mentor') {
        // Verify mentor existence
        const [mentorResult] = await pool.query(
          `SELECT * FROM mentors WHERE user_id = ?`,
          [user.user_id]
        );
        if (!mentorResult.length) {
          return res.status(401).json({ error: 'Mentor profile not found' });
        }
      } else if (user.role === 'mentee') {
        // Verify mentee existence
        const [menteeResult] = await pool.query(
          `SELECT * FROM mentees WHERE user_id = ?`,
          [user.user_id]
        );
        if (!menteeResult.length) {
          return res.status(401).json({ error: 'Mentee profile not found' });
        }
      } else {
        // If role is not recognized, return an error
        return res.status(400).json({ error: 'Invalid role specified' });
      }

      // Step 5: Generate JWT token for mentors or mentees
      const token = jwt.sign({ userId: user.user_id, role: user.role }, JWT_SECRET, {
        expiresIn: '1h',
      });

      // Step 6: Set token as HTTP-only cookie with SameSite set to 'None' and Secure set to false (for development)
      res.cookie('authToken', token, {
        httpOnly: true,
        secure: false, // Set to true in production
        sameSite: 'None', // Allows cross-origin requests
        path: '/',        // Ensures the cookie is sent with all requests to the domain
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
      res.status(201).json({ message: 'User registered', userId });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Optional logout function to clear the cookie
  async logout(req, res) {
    res.clearCookie('authToken', {
      httpOnly: true,
      secure: false, // Set to true in production
      sameSite: 'None',
      path: '/', // Ensure the path matches the cookie's path
    });
    res.json({ message: 'Logged out successfully' });
  }
};
