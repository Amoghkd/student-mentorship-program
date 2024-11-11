const MatchCrud = require('../crud/matchCrud');
const matchingService = require('../utils/matchingService');

const Match = {
  async suggestTopMentors(menteeId) {
    const mentee = await MatchCrud.getMenteeById(menteeId);
    if (!mentee) {
      throw new Error('Mentee not found');
    }

    const mentors = await MatchCrud.getAllMentors();
    if (mentors.length === 0) {
      throw new Error('No mentors available');
    }

    return matchingService.findTopMatches(mentors, mentee, 3);
  },

  /**
   * Save a selected match between a mentor and a mentee.
   * @param {Number} menteeId - The ID of the mentee.
   * @param {Number} mentorId - The ID of the mentor.
   * @param {Number} score - The match score.
   * @returns {Object} - Result of the save operation.
   */
  async saveSelectedMatch(menteeId, mentorId, score) {
    return await MatchCrud.saveMatch(menteeId, mentorId, score);
  }
};

module.exports = Match;
