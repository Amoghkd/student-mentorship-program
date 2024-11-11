const MentorCrud = require('../crud/mentorCrud');

const Mentor = {
  // Call CRUD methods from MentorCrud
  getAll: async () => {
    return await MentorCrud.getAll();
  },

  create: async (data) => {
    return await MentorCrud.create(data);
  },

  findById: async (id) => {
    return await MentorCrud.findById(id);
  },

  update: async (id, data) => {
    return await MentorCrud.update(id, data);
  },

  delete: async (id) => {
    return await MentorCrud.delete(id);
  }
};

module.exports = Mentor;
