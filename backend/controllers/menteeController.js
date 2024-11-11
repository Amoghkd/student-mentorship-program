const Mentee = require('../models/Mentee');

module.exports = {
  async getAll(req, res) {
    try {
      const mentees = await Mentee.getAll();
      res.json(mentees);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async create(req, res) {
    try {
      const menteeId = await Mentee.create(req.body);
      res.json({ mentee_id: menteeId });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async findById(req, res) {
    try {
      const mentee = await Mentee.findById(req.params.id);
      if (!mentee) {
        return res.status(404).json({ error: 'Mentee not found' });
      }
      res.json(mentee);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async update(req, res) {
    try {
      const updatedRows = await Mentee.update(req.params.id, req.body);
      if (updatedRows === 0) {
        return res.status(404).json({ error: 'Mentee not found' });
      }
      res.json({ message: 'Mentee updated' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async delete(req, res) {
    try {
      const deletedRows = await Mentee.delete(req.params.id);
      if (deletedRows === 0) {
        return res.status(404).json({ error: 'Mentee not found' });
      }
      res.json({ message: 'Mentee deleted' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};
