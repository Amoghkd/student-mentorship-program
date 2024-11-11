const express = require('express');
const cors = require('cors'); // Import the CORS package

const mentorRoutes = require('./routes/mentorRoutes');
const menteeRoutes = require('./routes/menteeRoutes');
const matchRoutes = require('./routes/matchRoutes');
// const userRoutes = require('./routes/userRoutes');  // Import the new user routes



const app = express();
app.use(express.json());

app.use(cors({
    origin: 'http://localhost:3000',  // Replace with your frontend URL
    credentials: true                 // If you need to send cookies or authorization headers
}));

app.use('/api/mentors', mentorRoutes);
app.use('/api/mentees', menteeRoutes);
app.use('/api/matches', matchRoutes);
// app.use('/api/users', userRoutes);  // Add the user routes

module.exports = app;
