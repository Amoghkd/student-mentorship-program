const pool = require('../config/db');

const MenteeCrud = {
  async getAll() {
    const [rows] = await pool.query('SELECT * FROM mentees');
    return rows;
  },

  async create(data) {
    const { user_id, name, contact_info, interests, needs_goals, preferred_communication, location } = data;
    const [result] = await pool.query(
      `INSERT INTO mentees (user_id, name, contact_info, interests, needs_goals, preferred_communication, location)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [user_id, name, JSON.stringify(contact_info), JSON.stringify(interests), needs_goals, preferred_communication, location]
    );
    return result.insertId;
  },

  async findById(id) {
    const [rows] = await pool.query('SELECT * FROM mentees WHERE mentee_id = ?', [id]);
    return rows[0];
  },

  async update(id, data) {
    const { name, contact_info, interests, needs_goals, preferred_communication, location } = data;
    const [result] = await pool.query(
      `UPDATE mentees SET name = ?, contact_info = ?, interests = ?, needs_goals = ?, preferred_communication = ?, location = ?
       WHERE mentee_id = ?`,
      [name, JSON.stringify(contact_info), JSON.stringify(interests), needs_goals, preferred_communication, location, id]
    );
    return result.affectedRows;
  },

  async delete(id) {
    const [result] = await pool.query('DELETE FROM mentees WHERE mentee_id = ?', [id]);
    return result.affectedRows;
  }
};

module.exports = MenteeCrud;
