const pool = require('../config/db');

const Mentee = {
    create: async (data) => {
        const formattedData = {
            ...data,
            contact_info: JSON.stringify(data.contact_info),
            interests: JSON.stringify(data.interests)
        };

        const sql = 'INSERT INTO mentees SET ?';
        const [result] = await pool.query(sql, formattedData);
        return result.insertId;
    },
    findById: async (id) => {
        const sql = 'SELECT * FROM mentees WHERE mentee_id = ?';
        const [rows] = await pool.query(sql, [id]);
        return rows[0];
    },
    findAll: async () => {
        const sql = 'SELECT * FROM mentees';
        const [rows] = await pool.query(sql);
        return rows;
    },
    update: async (id, data) => {
        const formattedData = {
            ...data,
            contact_info: JSON.stringify(data.contact_info),
            interests: JSON.stringify(data.interests)
        };
        const sql = 'UPDATE mentees SET ? WHERE mentee_id = ?';
        const [result] = await pool.query(sql, [formattedData, id]);
        return result.affectedRows;
    },
    delete: async (id) => {
        const sql = 'DELETE FROM mentees WHERE mentee_id = ?';
        const [result] = await pool.query(sql, [id]);
        return result.affectedRows;
    }
};

module.exports = Mentee;
