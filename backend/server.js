const app = require('./app');
const pool = require('./config/db');
const PORT = process.env.PORT || 4000;

(async () => {
  try {
    // Check the database connection
    await pool.getConnection();
    console.log('Database connected...');

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
})();
