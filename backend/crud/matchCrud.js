const pool = require('../config/db');

const MatchCrud = {
  async getMenteeById(menteeId) {
    const [menteeRows] = await pool.query('SELECT * FROM mentees WHERE mentee_id = ?', [menteeId]);
    return menteeRows[0];
  },

  async getAllMentors() {
    const [mentorRows] = await pool.query('SELECT * FROM mentors');
    return mentorRows;
  },

  /**
   * Save a selected match to the database.
   * @param {Number} menteeId - The ID of the mentee.
   * @param {Number} mentorId - The ID of the mentor.
   * @param {Number} score - The match score.
   * @returns {Object} - Result of the database operation.
   */
  async saveMatch(menteeId, mentorId, score) {
    const [result] = await pool.query(
      `INSERT INTO mentor_mentee_matches (mentee_id, mentor_id, score, match_date)
       VALUES (?, ?, ?, CURRENT_DATE)`,
      [menteeId, mentorId, score]
    );
    return result;
  }
};

module.exports = MatchCrud;
