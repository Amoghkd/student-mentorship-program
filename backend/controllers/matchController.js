const Match = require('../models/Match');

module.exports = {
  async suggestTopMentors(req, res) {
    try {
      const { id } = req.params;
      const topMentors = await Match.suggestTopMentors(id);
      res.json(topMentors);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  /**
   * Handle the request to save a selected match.
   * @param {Object} req - The HTTP request object.
   * @param {Object} res - The HTTP response object.
   */
  async saveSelectedMatch(req, res) {
    try {
      const { menteeId, mentorId, score } = req.body;
      const result = await Match.saveSelectedMatch(menteeId, mentorId, score);
      res.json({ message: 'Match saved successfully', result });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};
