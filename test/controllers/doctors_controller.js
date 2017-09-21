const assert = require('assert');
const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../../server/app');

const Doctor = mongoose.model('doctor');

describe('Doctors controller', () => {
  it('POST to /api/doctors creates a new doctor', done => {
    Doctor.count().then(count => {
      request(app)
        .post('/api/doctors')
        .send({ email: 'doctor@test.com' })
        .end(() => {
          Doctor.count().then(newCount => {
            assert(count + 1 === newCount);
            done();
          });
        });
    });
  });

  it('PUT to /api/doctors/:id edits an existing doctor', done => {
    const doctor = new Doctor({ email: 'doctor2@test.com', bio: 'N/A' });
    doctor.save().then(() => {
      request(app)
        .put(`/api/doctors/${doctor._id}`)
        .send({ bio: 'testing' })
        .end(() => {
          Doctor.findOne({ email: 'doctor2@test.com' }).then(doctor => {
            assert(doctor.bio === 'testing');
            done();
          });
        });
    });
  });

  it('DELETE to /api/doctors/:id can remove an existing doctor', done => {
    const doctor = new Doctor({ email: 'doctor3@test.com', bio: 'N/A' });
    doctor.save().then(() => {
      request(app)
        .delete(`/api/doctors/${doctor._id}`)
        .end(() => {
          Doctor.findOne({ email: 'doctor3@test.com' }).then(doctor => {
            assert(doctor === null);
            done();
          });
        });
    });
  });

  it('GET to /api/doctors finds doctors in a location', done => {
    const sfDoctor = new Doctor({
      email: 'sf@test.com',
      geometry: { type: 'Point', coordinates: [-122.4194, 37.7749] }
    });
    const nyDoctor = new Doctor({
      email: 'ny@test.com',
      geometry: { type: 'Point', coordinates: [-74.0059, 40.7128] }
    });

    Promise.all([nyDoctor.save(), sfDoctor.save()]).then(() => {
      request(app)
        .get('/api/doctors?lng=-74&lat=40')
        .end((err, response) => {
          assert(response.body.length === 1);
          assert(response.body[0].obj.email === 'ny@test.com');
          done();
        });
    });
  });
});
