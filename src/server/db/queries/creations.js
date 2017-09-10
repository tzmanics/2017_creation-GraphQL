const knex = require('../connection');

function getAllCreations() {
  return knex('creations')
  .select('*');
}

module.exports = {
  getAllCreations
};