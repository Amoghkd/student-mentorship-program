const mysql = require('mysql2/promise');
require('dotenv').config();

async function setupDatabase() {
    let connection;

    try {
        // Step 1: Connect to MySQL without specifying the database
        console.log("Connecting to MySQL server...");
        connection = await mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASS,
            port: process.env.DB_PORT || 3306,
            connectTimeout: 10000
        });
        console.log("Connected to MySQL server.");

        // Step 2: Create the database if it doesn't exist
        const dbName = process.env.DB_NAME;
        console.log(`Attempting to create database "${dbName}" if it doesn't exist...`);
        await connection.query(`CREATE DATABASE IF NOT EXISTS \`${dbName}\``);
        console.log(`Database "${dbName}" created or already exists.`);

        // Step 3: Switch to the created database
        await connection.changeUser({ database: dbName });
        console.log(`Switched to database "${dbName}".`);

        // Step 4: Create tables
        const createUsersTable = `
            CREATE TABLE IF NOT EXISTS users (
                user_id INT PRIMARY KEY AUTO_INCREMENT,
                username VARCHAR(100) NOT NULL UNIQUE,
                password VARCHAR(255) NOT NULL,
                role ENUM('admin', 'mentor', 'mentee') NOT NULL
            )
        `;
        await connection.query(createUsersTable);
        console.log("Table 'users' created or already exists.");

        const createMentorsTable = `
            CREATE TABLE IF NOT EXISTS mentors (
                mentor_id INT PRIMARY KEY AUTO_INCREMENT,
                user_id INT UNIQUE, 
                name VARCHAR(100) NOT NULL,
                contact_info JSON,
                expertise JSON,
                availability VARCHAR(100),
                languages VARCHAR(100),
                bio TEXT,
                FOREIGN KEY (user_id) REFERENCES users(user_id)
            )
        `;
        await connection.query(createMentorsTable);
        console.log("Table 'mentors' created or already exists.");

        const createMenteesTable = `
            CREATE TABLE IF NOT EXISTS mentees (
                mentee_id INT PRIMARY KEY AUTO_INCREMENT,
                user_id INT UNIQUE, 
                name VARCHAR(100) NOT NULL,
                contact_info JSON,
                interests JSON,
                needs_goals TEXT,
                preferred_communication VARCHAR(50),
                location VARCHAR(100),
                FOREIGN KEY (user_id) REFERENCES users(user_id)
            )
        `;
        await connection.query(createMenteesTable);
        console.log("Table 'mentees' created or already exists.");

        const createCrudLogsTable = `
            CREATE TABLE IF NOT EXISTS crud_logs (
                log_id INT PRIMARY KEY AUTO_INCREMENT,
                table_name VARCHAR(50),
                operation VARCHAR(10),
                user_id INT,
                timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
            )
        `;
        await connection.query(createCrudLogsTable);
        console.log("Table 'crud_logs' created or already exists.");

        const createMatchesTable = `
            CREATE TABLE IF NOT EXISTS mentor_mentee_matches (
                match_id INT PRIMARY KEY AUTO_INCREMENT,
                mentee_id INT,
                mentor_id INT,
                score DECIMAL(5, 2) NOT NULL,
                match_date DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
                outcome_feedback TEXT,
                FOREIGN KEY (mentee_id) REFERENCES mentees(mentee_id),
                FOREIGN KEY (mentor_id) REFERENCES mentors(mentor_id)
            )
        `;
        await connection.query(createMatchesTable);
        console.log("Table 'mentor_mentee_matches' created or already exists.");

        console.log("Database setup completed successfully.");

        // Step 5: Create Triggers (Uncomment to activate triggers)
        
        // Trigger to delete user entry after mentor deletion
        const mentorDeleteTrigger = `
            CREATE TRIGGER delete_user_after_mentor_delete
            AFTER DELETE ON mentors
            FOR EACH ROW
            DELETE FROM users WHERE user_id = OLD.user_id
        `;

        // Trigger to delete user entry after mentee deletion
        const menteeDeleteTrigger = `
            CREATE TRIGGER delete_user_after_mentee_delete
            AFTER DELETE ON mentees
            FOR EACH ROW
            DELETE FROM users WHERE user_id = OLD.user_id
        `;

        // Logging trigger for mentor insertion
        const mentorInsertLogTrigger = `
            CREATE TRIGGER log_mentor_insert
            AFTER INSERT ON mentors
            FOR EACH ROW
            INSERT INTO crud_logs (table_name, operation, user_id) VALUES ('mentors', 'INSERT', NEW.user_id)
        `;

        // Logging trigger for mentee insertion
        const menteeInsertLogTrigger = `
            CREATE TRIGGER log_mentee_insert
            AFTER INSERT ON mentees
            FOR EACH ROW
            INSERT INTO crud_logs (table_name, operation, user_id) VALUES ('mentees', 'INSERT', NEW.user_id)
        `;

        // Logging trigger for mentor update
        const mentorUpdateLogTrigger = `
            CREATE TRIGGER log_mentor_update
            AFTER UPDATE ON mentors
            FOR EACH ROW
            INSERT INTO crud_logs (table_name, operation, user_id) VALUES ('mentors', 'UPDATE', NEW.user_id)
        `;

        // Logging trigger for mentee update
        const menteeUpdateLogTrigger = `
            CREATE TRIGGER log_mentee_update
            AFTER UPDATE ON mentees
            FOR EACH ROW
            INSERT INTO crud_logs (table_name, operation, user_id) VALUES ('mentees', 'UPDATE', NEW.user_id)
        `;

        // Logging trigger for mentor deletion
        const mentorDeleteLogTrigger = `
            CREATE TRIGGER log_mentor_delete
            AFTER DELETE ON mentors
            FOR EACH ROW
            INSERT INTO crud_logs (table_name, operation, user_id) VALUES ('mentors', 'DELETE', OLD.user_id)
        `;

        // Logging trigger for mentee deletion
        const menteeDeleteLogTrigger = `
            CREATE TRIGGER log_mentee_delete
            AFTER DELETE ON mentees
            FOR EACH ROW
            INSERT INTO crud_logs (table_name, operation, user_id) VALUES ('mentees', 'DELETE', OLD.user_id)
        `;

        // Execute each trigger creation statement
        await connection.query(mentorDeleteTrigger);
        await connection.query(menteeDeleteTrigger);
        await connection.query(mentorInsertLogTrigger);
        await connection.query(menteeInsertLogTrigger);
        await connection.query(mentorUpdateLogTrigger);
        await connection.query(menteeUpdateLogTrigger);
        await connection.query(mentorDeleteLogTrigger);
        await connection.query(menteeDeleteLogTrigger);

        console.log("Triggers for logging and deletion have been created successfully.");
        

    } catch (error) {
        console.error("Error setting up the database:", error.message);
    } finally {
        if (connection) {
            await connection.end();
            console.log("MySQL connection closed.");
        }
    }
}

setupDatabase();
