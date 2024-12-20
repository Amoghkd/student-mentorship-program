const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const mentorRoutes = require('./routes/mentorRoutes');
const menteeRoutes = require('./routes/menteeRoutes');
const matchRoutes = require('./routes/matchRoutes');
const authRoutes = require('./routes/authRoutes');// Import the authentication routes

const userRoutes=require('./routes/userRoutes') ; 
const app = express();
app.use(express.json());
app.use(cookieParser()); // Add this line to parse cookies

app.use(cors({
    origin: 'http://localhost:3000',  // Replace with your frontend URL
    credentials: true                 // If you need to send cookies or authorization headers
}));

// Define the API routes
app.use('/api/mentors', mentorRoutes);
app.use('/api/mentees', menteeRoutes);
app.use('/api/matches', matchRoutes);
app.use('/api/auth', authRoutes);     // Add the authentication routes for login and register
app.use('/api/admin',userRoutes)
module.exports = app;
