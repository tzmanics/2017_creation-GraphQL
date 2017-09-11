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

module.exports = {
  getAllCreations,
  getSingleCreation,
  addCreation
};
