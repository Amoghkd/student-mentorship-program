const pool = require('../config/db');

const Mentor = {
    create: async (data) => {
        // Convert JSON fields to strings
        const formattedData = {
            ...data,
            contact_info: JSON.stringify(data.contact_info),
            expertise: JSON.stringify(data.expertise)
        };

        const sql = 'INSERT INTO mentors SET ?';
        const [result] = await pool.query(sql, formattedData);
        return result.insertId;
    },
    findById: async (id) => {
        const sql = 'SELECT * FROM mentors WHERE mentor_id = ?';
        const [rows] = await pool.query(sql, [id]);
        return rows[0];
    },
    findAll: async () => {
        const sql = 'SELECT * FROM mentors';
        const [rows] = await pool.query(sql);
        return rows;
    },
    update: async (id, data) => {
        const formattedData = {
            ...data,
            contact_info: JSON.stringify(data.contact_info),
            expertise: JSON.stringify(data.expertise)
        };
        const sql = 'UPDATE mentors SET ? WHERE mentor_id = ?';
        const [result] = await pool.query(sql, [formattedData, id]);
        return result.affectedRows;
    },
    delete: async (id) => {
        const sql = 'DELETE FROM mentors WHERE mentor_id = ?';
        const [result] = await pool.query(sql, [id]);
        return result.affectedRows;
    }
};

module.exports = Mentor;
