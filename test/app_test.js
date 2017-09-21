const assert = require('assert');
const request = require('supertest');
const app = require('../server/app');

describe('The better doctor app', () => {
  it('handle a GET request to /better-doctor-api/doctors/:name for an existing doctor', done => {
    request(app)
      .get('/better-doctor-api/doctors?name=Katarzyna%20W.%20Rapa')
      .end((err, response) => {
        assert(response.body.first_name === 'Katarzyna');
        assert(response.body.last_name === 'Rapa');
        done();
      });
  });
});
