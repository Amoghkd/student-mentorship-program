const pool = require('../config/db');

const Match = {
    save: async (mentorId, menteeId, score) => {
        const sql = 'INSERT INTO mentor_mentee_matches (mentor_id, mentee_id, score, match_date) VALUES (?, ?, ?, NOW())';
        await pool.query(sql, [mentorId, menteeId, score]);
    },
    findMatchesByMentee: async (menteeId) => {
        const sql = 'SELECT * FROM mentor_mentee_matches WHERE mentee_id = ?';
        const [rows] = await pool.query(sql, [menteeId]);
        return rows;
    }
};

module.exports = Match;
