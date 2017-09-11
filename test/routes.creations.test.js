process.env.NODE_ENV = 'test';

const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');
chai.use(chaiHttp);

const server = require('../src/server/index');
const knex = require('../src/server/db/connection');

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
          'id', 'title', 'description', 'materials', 'image', 'category'
        );
        done();
      });
    });
  });

  describe('GET /api/v1/creations/:id', () => {
    it('should respond with a single creation', (done) => {
      chai.request(server)
      .get('/api/v1/creations/1')
      .end((err, res) => {
        should.not.exist(err);
        res.status.should.equal(200);
        res.type.should.equal('application/json');
        res.body.status.should.eql('success');
        res.body.data[0].should.include.keys(
          'id', 'title', 'description', 'materials', 'image', 'category'
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
        description: 'Test description.',
        materials: 'test materials',
        image: 'test link',
        category: 'test category'
      })
      .end((err, res) => {
        should.not.exist(err);
        res.status.should.equal(201);
        res.type.should.equal('application/json');
        res.body.status.should.eql('success');
        res.body.data[0].should.include.keys(
          'id', 'title', 'description', 'materials', 'image', 'category'
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

  describe('PUT /api/v1/creations', () => {
    it('should return the creation that was updated', (done) => {
      knex('creations')
      .select('*')
      .then((creation) => {
        const creationObject = creation[0];
        chai.request(server)
        .put(`/api/v1/creations/${creationObject.id}`)
        .send({
          title: 'Toshi'
        })
        .end((err, res) => {
          should.not.exist(err);
          res.status.should.equal(200);
          res.type.should.equal('application/json');
          res.body.status.should.eql('success');
          res.body.data[0].should.include.keys(
            'id', 'title', 'description', 'materials', 'image', 'category'
          );
          const newCreationObject = res.body.data[0];
          newCreationObject.category.should.not.eql(creationObject.rating);
          done();
        });
      });
    });
    it('should throw an error if the creation does not exist', (done) => {
      chai.request(server)
      .put('/api/v1/creations/2222222')
      .send({
        title: 'Toshi'
      })
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

  describe('DELETE /api/v1/creations/:id', () => {
    it('should return the creation that was deleted', (done) => {
      knex('creations')
      .select('*')
      .then((creations) => {
        const creationObject = creations[0];
        const lengthBeforeDelete = creations.length;
        chai.request(server)
        .delete(`/api/v1/creations/${creationObject.id}`)
        .end((err, res) => {
          should.not.exist(err);
          res.status.should.equal(200);
          res.type.should.equal('application/json');
          res.body.status.should.eql('success');
          res.body.data[0].should.include.keys(
            'id', 'title', 'description', 'materials', 'image', 'category'
          );
          knex('creations').select('*')
          .then((updatedCreations) => {
            updatedCreations.length.should.eql(lengthBeforeDelete - 1);
            done();
          })
        });
      });
    });
    it('should throw an error if the creation does not exist', (done) => {
      chai.request(server)
      .delete('/api/v1/creations/2222222')
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
});
