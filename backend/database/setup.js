const mysql = require('mysql2/promise');
require('dotenv').config();

async function setupDatabase() {
    let connection;

    try {
        // Debug: Log environment variables (excluding sensitive info)
        console.log("DB_HOST:", process.env.DB_HOST);
        console.log("DB_USER:", process.env.DB_USER);
        console.log("DB_NAME:", process.env.DB_NAME);
        console.log("DB_PORT:", process.env.DB_PORT || 3306);

        if (process.env.DB_PASS) {
            console.log("DB_PASS is set.");
        } else {
            console.error("DB_PASS is NOT set. Please check your .env file.");
            process.exit(1); // Exit the script as credentials are missing
        }

        // Establish the connection first
        console.log("Attempting to connect to the MySQL server...");
        connection = await mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASS,
            port: process.env.DB_PORT || 3306,
            connectTimeout: 10000 // 10 seconds
        });
        console.log("Successfully connected to the MySQL server.");

        // Create the database if it doesn't exist
        const dbName = process.env.DB_NAME;
        if (!dbName) {
            throw new Error("DB_NAME is not defined in the environment variables.");
        }

        console.log(`Creating database "${dbName}" if it doesn't exist...`);
        await connection.query(`CREATE DATABASE IF NOT EXISTS \`${dbName}\``);
        console.log(`Database "${dbName}" created or already exists.`);

        // Change the connection to use the newly created database
        await connection.changeUser({ database: dbName });
        console.log(`Switched to database "${dbName}".`);

        // Define table creation queries
        const createUsersTable = `
            CREATE TABLE IF NOT EXISTS users (
                user_id INT PRIMARY KEY AUTO_INCREMENT,
                username VARCHAR(100) NOT NULL UNIQUE,
                password VARCHAR(255) NOT NULL,
                role ENUM('admin', 'mentor', 'mentee') NOT NULL
            )
        `;

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
                FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
            )
        `;

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
                FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
            )
        `;

        // Create `users` table
        console.log("Creating 'users' table if it doesn't exist...");
        await connection.query(createUsersTable);
        console.log("Table 'users' created or already exists.");

        // Create `mentors` table
        console.log("Creating 'mentors' table if it doesn't exist...");
        await connection.query(createMentorsTable);
        console.log("Table 'mentors' created or already exists.");

        // Create `mentees` table
        console.log("Creating 'mentees' table if it doesn't exist...");
        await connection.query(createMenteesTable);
        console.log("Table 'mentees' created or already exists.");

    } catch (error) {
        console.error("Error setting up the database:", error.message);
        // For detailed debugging, uncomment the line below
        // console.error(error);
    } finally {
        if (connection) {
            try {
                await connection.end();
                console.log("Database connection closed.");
            } catch (endError) {
                console.error("Error closing the connection:", endError.message);
            }
        }
        console.log("Database setup process completed.");
    }
}

setupDatabase();
