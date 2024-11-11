const MenteeCrud = require('../crud/menteeCrud');

const Mentee = {
  // Call CRUD methods from MenteeCrud
  getAll: async () => {
    return await MenteeCrud.getAll();
  },

  create: async (data) => {
    return await MenteeCrud.create(data);
  },

  findById: async (id) => {
    return await MenteeCrud.findById(id);
  },

  update: async (id, data) => {
    return await MenteeCrud.update(id, data);
  },

  delete: async (id) => {
    return await MenteeCrud.delete(id);
  }
};

module.exports = Mentee;
