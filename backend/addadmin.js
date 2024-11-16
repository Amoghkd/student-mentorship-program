const bcrypt = require('bcryptjs');
const pool = require('./config/db'); // Assuming config/db.js exports your database connection pool

async function addAdminUser(username, password) {
    try {
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insert the new admin user into the users table
        const [result] = await pool.query(
            'INSERT INTO users (username, password, role) VALUES (?, ?, ?)',
            [username, hashedPassword, 'admin']
        );

        console.log(`Admin user added with ID: ${result.insertId}`);
    } catch (error) {
        console.error("Error adding admin user:", error.message);
    } finally {
        // Close the database connection
        await pool.end();
    }
}

// Usage
const username = 'adminuser'; // Replace with desired admin username
const password = 'adminpassword'; // Replace with desired admin password
addAdminUser(username, password);
