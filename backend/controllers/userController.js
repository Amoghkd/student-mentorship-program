const Mentor = require('../models/Mentor');
const Mentee = require('../models/Mentee');

exports.createUser = async (req, res) => {
    const { userType, name, contact_info, expertise, availability, languages, bio } = req.body;

    // Validation for required fields
    if (!userType || !name || !contact_info || !expertise) {
        return res.status(400).json({ error: 'Missing required fields: userType, name, contact_info, or expertise' });
    }

    try {
        if (userType === 'mentor') {
            // Create a mentor
            const mentorId = await Mentor.create({
                name,
                contact_info,
                expertise,
                availability,
                languages,
                bio
            });
            res.json({ message: 'Mentor created successfully', mentorId });
        } else if (userType === 'mentee') {
            // Create a mentee
            const menteeId = await Mentee.create({
                name,
                contact_info,
                interests: expertise,  // Adjusted field name for mentee
                needs_goals: req.body.needs_goals,
                preferred_communication: req.body.preferred_communication,
                location: req.body.location
            });
            res.json({ message: 'Mentee created successfully', menteeId });
        } else {
            res.status(400).json({ error: 'Invalid user type. Use "mentor" or "mentee".' });
        }
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ error: 'Failed to create user' });
    }
};  
