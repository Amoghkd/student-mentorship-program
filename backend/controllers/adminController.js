const pool = require('../config/db');

const AdminController = {
  // Get the count of mentors and mentees
  async getUserCounts(req, res) {
    try {
      // Call the MySQL function to get the counts
      const [result] = await pool.query('SELECT count_mentors_mentees() AS counts');

      // Handle JSON parsing safely
      const counts = typeof result[0].counts === 'string' ? JSON.parse(result[0].counts) : result[0].counts;

      res.json({ message: 'Counts retrieved successfully', counts });
    } catch (error) {
      console.error("Error fetching user counts:", error);
      res.status(500).json({ error: 'An error occurred while fetching user counts' });
    }
  },

  // Get all users
  async getAllUsers(req, res) {
    try {
      const [users] = await pool.query('SELECT * FROM users');
      res.json({ message: 'Users retrieved successfully', users });
    } catch (error) {
      console.error("Error fetching all users:", error);
      res.status(500).json({ error: 'An error occurred while fetching users' });
    }
  },

  // Get a user by ID
  async getUserById(req, res) {
    const { id } = req.params;
    try {
      const [user] = await pool.query('SELECT * FROM users WHERE user_id = ?', [id]);
      if (!user.length) {
        return res.status(404).json({ error: 'User not found' });
      }
      res.json({ message: 'User retrieved successfully', user: user[0] });
    } catch (error) {
      console.error("Error fetching user:", error);
      res.status(500).json({ error: 'An error occurred while fetching the user' });
    }
  },

  // Create a new user
  async createUser(req, res) {
    const { username, password, role } = req.body;
    try {
      const [result] = await pool.query(
        'INSERT INTO users (username, password, role) VALUES (?, ?, ?)',
        [username, password, role]
      );
      res.status(201).json({ message: 'User created successfully', userId: result.insertId });
    } catch (error) {
      console.error("Error creating user:", error);
      res.status(500).json({ error: 'An error occurred while creating the user' });
    }
  },

  // Update an existing user
  async updateUser(req, res) {
    const { id } = req.params;
    const { username, password, role } = req.body;
    try {
      const [result] = await pool.query(
        'UPDATE users SET username = ?, password = ?, role = ? WHERE user_id = ?',
        [username, password, role, id]
      );
      if (result.affectedRows === 0) {
        return res.status(404).json({ error: 'User not found or no changes made' });
      }
      res.json({ message: 'User updated successfully' });
    } catch (error) {
      console.error("Error updating user:", error);
      res.status(500).json({ error: 'An error occurred while updating the user' });
    }
  },

  // Delete a user
  async deleteUser(req, res) {
    const { id } = req.params;
    try {
      const [result] = await pool.query('DELETE FROM users WHERE user_id = ?', [id]);
      if (result.affectedRows === 0) {
        return res.status(404).json({ error: 'User not found' });
      }
      res.json({ message: 'User deleted successfully', deletedUserId: id });
    } catch (error) {
      console.error("Error deleting user:", error);
      res.status(500).json({ error: 'An error occurred while deleting the user' });
    }
  }
};

module.exports = AdminController;
