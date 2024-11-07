const Mentor = require('../models/Mentor');

exports.createMentor = async (req, res) => {
    const { name, contact_info, expertise, availability, languages, bio } = req.body;

    // Check for required fields
    if (!name || !contact_info || !expertise) {
        return res.status(400).json({
            error: 'Missing required fields: name, contact_info, and expertise are required.'
        });
    }

    try {
        // Create mentor with provided data
        const mentorId = await Mentor.create({
            name,
            contact_info: JSON.stringify(contact_info),
            expertise: JSON.stringify(expertise),
            availability,
            languages,
            bio
        });
        
        res.status(201).json({ 
            message: 'Mentor created successfully', 
            mentorId 
        });
    } catch (error) {
        console.error('Error creating mentor:', error);
        res.status(500).json({ 
            error: 'Failed to create mentor. Please try again.' 
        });
    }
};

exports.getAllMentors = async (req, res) => {
    try {
        const mentors = await Mentor.findAll();
        res.status(200).json(mentors);
    } catch (error) {
        console.error('Error retrieving mentors:', error);
        res.status(500).json({ 
            error: 'Failed to retrieve mentors. Please try again.' 
        });
    }
};
