 process.env.NODE_ENV = 'test';

 const chai = require('chai');
 const chaiHTTP = require('chai-http');

 const should = chai.should();
 const server = require('../src/server/index');

 chai.use(chaiHTTP);

describe('routes : index', () => {

  describe('GET /', () => {
    it('should return json', (done) => {
      chai.request(server)
      .get('/')
      .end((err, res) => {
        should.not.exist(err);
        res.status.should.eql(200);
        res.type.should.eql('application/json');
        res.body.status.should.equal('success');
        res.body.message.should.eql('⚒Welcome to the Creations API!⚒');
        done();
      });
    });
  });

});