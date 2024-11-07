const graphlib = require('graphlib');
const { Graph } = graphlib;

function calculateCompatibility(mentor, mentee) {
    // Simple example, could be more complex
    let score = 0;
    if (mentor.expertise.includes(mentee.interests)) score += 10;
    if (mentor.availability === mentee.availability) score += 5;
    if (mentor.languages.includes(mentee.languages)) score += 3;
    return score;
}

function findMatches(mentors, mentees) {
    const g = new Graph();

    mentors.forEach((mentor) => {
        g.setNode(`mentor-${mentor.mentor_id}`, mentor);
    });

    mentees.forEach((mentee) => {
        g.setNode(`mentee-${mentee.mentee_id}`, mentee);
    });

    mentors.forEach((mentor) => {
        mentees.forEach((mentee) => {
            const compatibilityScore = calculateCompatibility(mentor, mentee);
            if (compatibilityScore > 0) {
                g.setEdge(`mentor-${mentor.mentor_id}`, `mentee-${mentee.mentee_id}`, compatibilityScore);
            }
        });
    });

    return g.edges().map(edge => ({
        mentor: g.node(edge.v),
        mentee: g.node(edge.w),
        score: g.edge(edge)
    })).sort((a, b) => b.score - a.score);
}

module.exports = findMatches;
