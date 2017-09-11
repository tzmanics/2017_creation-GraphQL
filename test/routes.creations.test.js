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
 
  describe('GET /api/v1/creations/:id', () => {
    it('should return a single creation', (done) => {
      chai.request(server)
      .get('/api/v1/creations/1')
      .end((err, res) => {
        should.not.exist(err);
        res.status.should.equal(200);
        res.type.should.equal('application/json');
        res.body.status.should.eql('success');
        res.body.data.length.should.eql(1);
        res.body.data[0].should.include.keys(
          'id', 'title', 'description', 'materials', 'category', 'image'
        );
        done();
      });
    });

    it('should throw an error if the creation does not exist', (done) => {
      chai.request(server)
      .get('/api/v1/creations/2222222')
      .end((err, res) => {
        should.exist(err);
        res.status.should.equal(404);
        res.type.should.equal('application/json');
        res.body.status.should.eql('error');
        res.body.message.should.eql('That creation does not exist.');
        done();
      });
    });
  });

  describe('POST /api/v1/creations', () => {
    it('should return the creation that was added', (done) => {
      chai.request(server)
      .post('/api/v1/creations')
      .send({
        title: 'Test Title',
        description: 'Test description here.',
        materials: 'test, materials',
        category: 'test',
        image: 'http://bit.ly/2wRVdqy'
      })
      .end((err, res) => {
        should.not.exist(err);
        res.status.should.equal(201);
        res.type.should.equal('application/json');
        res.body.status.should.eql('success');
        res.body.data[0].should.include.keys(
          'id', 'title', 'description', 'materials', 'category', 'image'
        );
        done();
      });
    });

    it('should throw an error if the payload is malformed', (done) => {
      chai.request(server)
      .post('/api/v1/creations')
      .send({
        title: 'Test Title'
      })
      .end((err, res) => {
        should.exist(err);
        res.status.should.equal(400);
        res.type.should.equal('application/json');
        res.body.status.should.eql('error');
        should.exist(res.body.message);
        done();
      });
    });
  });
});
