const Mentee = require('../models/Mentee');

exports.createMentee = async (req, res) => {
    const { name, contact_info, interests, needs_goals, preferred_communication, location } = req.body;

    // Check for required fields
    if (!name || !contact_info || !interests) {
        return res.status(400).json({
            error: 'Missing required fields: name, contact_info, and interests are required.'
        });
    }

    try {
        // Create mentee with provided data
        const menteeId = await Mentee.create({
            name,
            contact_info: JSON.stringify(contact_info),
            interests: JSON.stringify(interests),
            needs_goals,
            preferred_communication,
            location
        });
        
        res.status(201).json({ 
            message: 'Mentee created successfully', 
            menteeId 
        });
    } catch (error) {
        console.error('Error creating mentee:', error);
        res.status(500).json({ 
            error: 'Failed to create mentee. Please try again.' 
        });
    }
};

exports.getAllMentees = async (req, res) => {
    try {
        const mentees = await Mentee.findAll();
        res.status(200).json(mentees);
    } catch (error) {
        console.error('Error retrieving mentees:', error);
        res.status(500).json({ 
            error: 'Failed to retrieve mentees. Please try again.' 
        });
    }
};
