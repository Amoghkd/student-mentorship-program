const mysql = require('mysql2/promise');
require('dotenv').config();

async function setupDatabase() {
    // Connect to MySQL without specifying a database, so we can create the `mentorship` database if it doesn’t exist
    const connection = await mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASS
    });

    try {
        // Create the database if it does not exist
        await connection.query(`CREATE DATABASE IF NOT EXISTS ${process.env.DB_NAME}`);
        console.log(`Database "${process.env.DB_NAME}" created or already exists.`);

        // Connect to the created database
        await connection.changeUser({ database: process.env.DB_NAME });

        // Create `mentors` table
        await connection.query(`
            CREATE TABLE IF NOT EXISTS mentors (
                mentor_id INT PRIMARY KEY AUTO_INCREMENT,
                name VARCHAR(100) NOT NULL,
                contact_info JSON,
                expertise JSON,
                availability VARCHAR(100),
                languages VARCHAR(100),
                bio TEXT
            )
        `);
        console.log("Table 'mentors' created or already exists.");

        // Create `mentees` table
        await connection.query(`
            CREATE TABLE IF NOT EXISTS mentees (
                mentee_id INT PRIMARY KEY AUTO_INCREMENT,
                name VARCHAR(100) NOT NULL,
                contact_info JSON,
                interests JSON,
                needs_goals TEXT,
                preferred_communication VARCHAR(50),
                location VARCHAR(100)
            )
        `);
        console.log("Table 'mentees' created or already exists.");

        // Create `mentor_mentee_matches` table
        await connection.query(`
            CREATE TABLE IF NOT EXISTS mentor_mentee_matches (
                match_id INT PRIMARY KEY AUTO_INCREMENT,
                mentor_id INT,
                mentee_id INT,
                score DECIMAL(5, 2) NOT NULL,
                match_date DATE NOT NULL DEFAULT (CURRENT_DATE),
                outcome_feedback TEXT,
                FOREIGN KEY (mentor_id) REFERENCES mentors(mentor_id),
                FOREIGN KEY (mentee_id) REFERENCES mentees(mentee_id)
            )
        `);
        console.log("Table 'mentor_mentee_matches' created or already exists.");
    } catch (error) {
        console.error("Error setting up database:", error);
    } finally {
        // Close the database connection
        await connection.end();
        console.log("Database setup completed.");
    }
}

setupDatabase();
