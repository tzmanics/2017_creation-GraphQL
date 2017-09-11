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

module.exports = {
  getAllCreations,
  getSingleCreation
};