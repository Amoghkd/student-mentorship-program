const pool = require('../config/db');

const MatchCrud = {
  async getAll() {
    const [rows] = await pool.query('SELECT * FROM mentor_mentee_matches');
    return rows;
  },

  async create(data) {
    const { mentee_id, mentor_id, score, outcome_feedback } = data;
    const [result] = await pool.query(
      `INSERT INTO mentor_mentee_matches (mentee_id, mentor_id, score, match_date, outcome_feedback)
       VALUES (?, ?, ?, CURRENT_DATE, ?)`,
      [mentee_id, mentor_id, score, outcome_feedback]
    );
    return result.insertId;
  },

  async findById(id) {
    const [rows] = await pool.query('SELECT * FROM mentor_mentee_matches WHERE match_id = ?', [id]);
    return rows[0];
  },

  async update(id, data) {
    const { score, outcome_feedback } = data;
    const [result] = await pool.query(
      `UPDATE mentor_mentee_matches SET score = ?, outcome_feedback = ?, match_date = CURRENT_DATE WHERE match_id = ?`,
      [score, outcome_feedback, id]
    );
    return result.affectedRows;
  },

  async delete(id) {
    const [result] = await pool.query('DELETE FROM mentor_mentee_matches WHERE match_id = ?', [id]);
    return result.affectedRows;
  }
};

module.exports = MatchCrud;
