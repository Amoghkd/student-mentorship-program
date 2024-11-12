const [rows] = await connection.query(`
    SELECT COUNT(*) AS count 
    FROM information_schema.COLUMNS 
    WHERE TABLE_SCHEMA = '${process.env.DB_NAME}' 
    AND TABLE_NAME = 'mentors' 
    AND COLUMN_NAME = 'role';
`);

if (rows[0].count === 0) {
    await connection.query(`
        ALTER TABLE mentors ADD COLUMN role ENUM('admin', 'mentor') NOT NULL DEFAULT 'mentor';
    `);
    console.log("Role column added to 'mentors' table.");
} else {
    console.log("Role column already exists in 'mentors' table.");
}
