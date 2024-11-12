const pool = require('../config/db');

const MentorCrud = {
  async getAll() {
    const [rows] = await pool.query('SELECT * FROM mentors');
    return rows;
  },

  async create(data) {
    const { name, password, contact_info, expertise, availability, languages, bio } = data;
    const [result] = await pool.query(
      `INSERT INTO mentors (name, password, contact_info, expertise, availability, languages, bio)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [name, password, JSON.stringify(contact_info), JSON.stringify(expertise), availability, languages, bio]
    );
    return result.insertId;
  },

  async findById(id) {
    const [rows] = await pool.query('SELECT * FROM mentors WHERE mentor_id = ?', [id]);
    return rows[0];
  },

  async update(id, data) {
    const { name, password, contact_info, expertise, availability, languages, bio } = data;
    const [result] = await pool.query(
      `UPDATE mentors SET name = ?, password = ?, contact_info = ?, expertise = ?, availability = ?, languages = ?, bio = ?
       WHERE mentor_id = ?`,
      [name, password, JSON.stringify(contact_info), JSON.stringify(expertise), availability, languages, bio, id]
    );
    return result.affectedRows;
  },

  async delete(id) {
    const [result] = await pool.query('DELETE FROM mentors WHERE mentor_id = ?', [id]);
    return result.affectedRows;
  }
};

module.exports = MentorCrud;
