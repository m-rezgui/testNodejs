import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';
import usersService from '../api/services/users-service';

chai.use(chaiHttp);
chai.should();

before((done) => {
  usersService();
  done();
});

describe('Route test', () => {
  describe('GET /users', () => {
    it('should 404 not found', (done) => {
      chai.request(app)
          .get('/')
          .end((err, res) => {
            res.should.have.status(404);
            done();
          });
    });

    it('should get all users', (done) => {
      chai.request(app)
          .get('/users')
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('array');
            res.body.should.have.lengthOf(3);
            res.body.forEach((el) => {
              el.should.be.a('object');
            });
            done();
          });
    });

    it('should get a single user', (done) => {
      const id = 1;
      chai.request(app)
          .get(`/users/${id}`)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            done();
          });
    });

    it('should not get a single user', (done) => {
      const id = 50;
      chai.request(app)
          .get(`/users/${id}`)
          .end((err, res) => {
            res.should.have.status(404);
            done();
          });
    });
  });

  describe('PUT /users/:id', () => {
    it('should update a single user', (done) => {
      chai.request(app)
          .get('/users')
          .end((err, res) => {
            chai.request(app)
                .put(`/users/${res.body[0].id}`)
                .send({'firstname': 'newFirstName', 'lastname': 'newLastName'})
                .end((err, res) => {
                  res.should.have.status(201);
                  res.should.be.json;
                  res.body.should.be.a('object');
                  res.body.firstname.should.equal('newFirstName');
                  res.body.lastname.should.equal('newLastName');
                  done();
                });
          });
    });

    it('should not update a single user', (done) => {
      const id = 50;
      chai.request(app)
          .get('/users')
          .end((err, res) => {
            chai.request(app)
                .put(`/users/${id}`)
                .send({'firstname': 'newFirstName', 'lastname': 'newLastName'})
                .end((err, res) => {
                  res.should.have.status(404);
                  res.should.be.json;
                  done();
                });
          });
    });
  });
});
