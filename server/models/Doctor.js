const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PointSchema = new Schema({
  type: { type: String, default: 'Point' },
  coordinates: { type: [Number], index: '2dsphere' },
});

const DoctorSchema = new Schema({
  first_name: {
    type: String
  },
  last_name: {
    type: String
  },
  middle_name: {
    type: String,
  },
  title: {
    type: String,
  },
  email:{
    type: String,
    required: true
  },
  bio: {
    type: String,
  },
  geometry: PointSchema
});

const Doctor = mongoose.model('doctor', DoctorSchema);

module.exports = Doctor;