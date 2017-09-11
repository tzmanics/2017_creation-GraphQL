const knex = require('../connection');

function getAllCreations() {
  return knex('creations')
  .select('*');
}

function getSingleCreation(id) {
  return knex('creations')
  .select('*')
  .where({ id: parseInt(id) });
}

function addCreation(creation) {
  return knex('creations')
  .insert(creation)
  .returning('*');
}

function updateCreation(id, creation) {
  return knex('creations')
  .update(creation)
  .where({ id: parseInt(id) })
  .returning('*');
}

function deleteCreation(id) {
  return knex('creations')
  .del()
  .where({ id: parseInt(id) })
  .returning('*');
}

module.exports = {
  getAllCreations,
  getSingleCreation,
  addCreation,
  updateCreation,
  deleteCreation
};
