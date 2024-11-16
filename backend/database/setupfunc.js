const mysql = require('mysql2/promise');
require('dotenv').config();

async function createCountMentorsMenteesFunction() {
    let connection;

    try {
        console.log("Connecting to MySQL server...");

        // Create a new connection without using the pool
        connection = await mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASS,
            database: process.env.DB_NAME,
            port: process.env.DB_PORT || 3306
        });
        
        console.log("Connected to MySQL server.");

        // Check if the function already exists
        console.log("Checking if the count_mentors_mentees function exists...");
        const [rows] = await connection.query(`
            SELECT ROUTINE_NAME
            FROM INFORMATION_SCHEMA.ROUTINES
            WHERE ROUTINE_SCHEMA = ? AND ROUTINE_NAME = 'count_mentors_mentees' AND ROUTINE_TYPE = 'FUNCTION'
        `, [process.env.DB_NAME]);

        if (rows.length > 0) {
            console.log("Function count_mentors_mentees already exists. Skipping creation.");
            return;
        }

        console.log("Creating function count_mentors_mentees...");

        // Create the function if it doesn't exist
        await connection.query(`
            CREATE FUNCTION count_mentors_mentees()
            RETURNS JSON
            DETERMINISTIC
            BEGIN
                DECLARE mentor_count INT;
                DECLARE mentee_count INT;
                
                -- Count mentors
                SELECT COUNT(*) INTO mentor_count FROM users WHERE role = 'mentor';
                
                -- Count mentees
                SELECT COUNT(*) INTO mentee_count FROM users WHERE role = 'mentee';
                
                -- Return counts as a JSON object
                RETURN JSON_OBJECT('mentors', mentor_count, 'mentees', mentee_count);
            END
        `);

        console.log("Function count_mentors_mentees created successfully.");
    } catch (error) {
        console.error("Error creating count_mentors_mentees function:", error.message);
    } finally {
        if (connection) {
            await connection.end();
            console.log("Database connection closed.");
        }
    }
}

// Run the function setup
createCountMentorsMenteesFunction();
