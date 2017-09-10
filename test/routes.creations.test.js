process.env.NODE_ENV = 'test';

const chai = require('chai');
const chaiHTTP = require('chai-http');

const should = chai.should();
const server = require('../src/server/index');
const knex = require('../src/server/db/connection');

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

  describe('GET /api/v1/creations', () => {
    it('should return all creations', (done) => {
      chai.request(server)
      .get('/api/v1/creations')
      .end((err, res) => {
        should.not.exist(err);
        res.status.should.equal(200);
        res.type.should.equal('application/json');
        res.body.status.should.eql('success');
        res.body.data.length.should.eql(2);
        res.body.data[0].should.include.keys(
          'id', 'title', 'description', 'materials', 'category', 'image'
        );
        done();
      });
    });
  });
});
