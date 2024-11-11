const Mentor = require('../models/Mentor');

module.exports = {
  async getAll(req, res) {
    try {
      const mentors = await Mentor.getAll();
      res.json(mentors);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async create(req, res) {
    try {
      const mentorId = await Mentor.create(req.body);
      res.json({ mentor_id: mentorId });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async findById(req, res) {
    try {
      const mentor = await Mentor.findById(req.params.id);
      if (!mentor) {
        return res.status(404).json({ error: 'Mentor not found' });
      }
      res.json(mentor);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async update(req, res) {
    try {
      const updatedRows = await Mentor.update(req.params.id, req.body);
      if (updatedRows === 0) {
        return res.status(404).json({ error: 'Mentor not found' });
      }
      res.json({ message: 'Mentor updated' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async delete(req, res) {
    try {
      const deletedRows = await Mentor.delete(req.params.id);
      if (deletedRows === 0) {
        return res.status(404).json({ error: 'Mentor not found' });
      }
      res.json({ message: 'Mentor deleted' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};
