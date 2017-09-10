process.env.NODE_ENV = 'test';

const chai = require('chai');
const chaiHTTP = require('chai-http');

const should = chai.should();
const server = require('../src/server/index');
const knex = require('../../src/server/db/connection');

chai.use(chaiHTTP);

describe('routes : creations', () => {
  beforeEach(() => {
    return knex.migrate.rollback()
    .then(() => { return knex.migrate.latest(); })
    .then(() => { return knex.seed.run(); });
  });

  afterEach(() => {
    return knex.migrate.rollback();
  });
});
