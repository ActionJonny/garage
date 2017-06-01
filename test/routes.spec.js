process.env.NODE_ENV = 'test';

const chai = require('chai');
const chaiHttp = require('chai-http');

chai.should();

const server = require('../server');

const configuration = require('../knexfile')['test'];
const database = require('knex')(configuration);

chai.use(chaiHttp);

describe('Garage', () => {
  beforeEach((done) => {
    database.migrate.latest()
    .then(() => {
      return database.seed.run();
    })
    .then(() => {
      done();
    });
  });

  afterEach((done) => {
    database.migrate.rollback()
    .then(() => {
      done();
    });
  });

  describe('GET', () => {

    it('Should get garbage from database', (done) => {
      chai.request(server)
      .get('/api/v1/model')
      .end((err, response) => {
        response.should.have.status(200);
        response.body[0].name.should.equal('trash');
        response.body[0].reason.should.equal('you should not keep too many things');
        response.body[0].cleanliness.should.equal('rancid');
        done();
      });
    });

    it('Should not find a garbage url', (done) => {
      chai.request(server)
      .get('/api/v1/models')
      .end((err, response) => {
        response.should.have.status(404);
        done();
      });
    });


    it('Should return an individual garbage', (done) => {
      chai.request(server)
      .get('/api/v1/model/1')
      .end((err, response) => {
        response.body[0].id.should.equal(1);
        response.body[0].name.should.equal('trash');
        response.body[0].reason.should.equal('you should not keep too many things');
        response.body[0].cleanliness.should.equal('rancid');
        done();
      });
    });

    it('Should not find garbage', (done) => {
      chai.request(server)
      .get('/api/v1/model/3')
      .end((err, response) => {
        response.should.have.status(404);
        done();
      });
    });
  });

    describe('POST', () => {

      it('Should be able to post new garbage', (done) => {
        chai.request(server)
        .post('/api/v1/model')
        .send({
          name: 'name',
          reason: 'reason',
          cleanliness: 'cleanliness',
      })
      .end((err, response) => {
        response.should.have.status(201);
        response.body.id.should.equal(3);
        response.body.name.should.equal('name');
        response.body.reason.should.equal('reason');
        response.body.cleanliness.should.equal('cleanliness');
        done();
      });
    });

    it('Should fail if user does not put all requirements in', (done) => {
      chai.request(server)
      .post('/api/v1/model')
      .send({
        name: 'name',
        cleanliness: 'cleanliness'
      })
      .end((err, response) => {
        response.should.have.status(422);
        done();
      });
    });
  });

  describe('Patch', () => {

    it('Should be able update cleanliness', (done) => {
      chai.request(server)
      .patch('/api/v1/model/1')
      .send({
        cleanliness: 'cleanliness',
      })
      .end((err, response) => {
        response.should.have.status(201);
        response.body.cleanliness.should.equal('cleanliness');
        done();
      });
    });

    it('Should not be able update cleanliness if the id does not exist', (done) => {
      chai.request(server)
      .patch('/api/v1/model/s')
      .send({
        cleanliness: 'cleanliness',
      })
      .end((err, response) => {
        response.should.have.status(404);
        done();
      });
    });

  });

});
