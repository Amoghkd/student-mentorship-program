const Mentor = require('../models/Mentor');
const Mentee = require('../models/Mentee');
const findMatches = require('../utils/graphMatching');

exports.getMatches = async (req, res) => {
    const mentors = await Mentor.findAll();
    const mentees = await Mentee.findAll();
    const matches = findMatches(mentors, mentees);
    res.json(matches);
};
