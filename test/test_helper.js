const mongoose = require('mongoose');

before(done => {
  mongoose.connect('mongodb://localhost/geoNearDoctorsTestDB');
  mongoose.connection.once('open', () => done()).on('error', err => {
    console.warn('Warning', error);
  });
});

beforeEach(done => {
  const { doctors } = mongoose.connection.collections;
  doctors
    .drop()
    .then(() => doctors.ensureIndex({ 'geometry.coordinates': '2dsphere' }))
    .then(() => done())
    .catch(() => done());
});
