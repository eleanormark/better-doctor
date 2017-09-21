const Doctor = require('../models/Doctor');
const keys = require('../../client/src/config/keys');
const request = require('request');
const rp = require('request-promise');

const API_KEY = keys.betterDoctorKey;
const ROOT_URL = `https://api.betterdoctor.com/2016-03-01/doctors?location=37.773%2C-122.413%2C100&user_location=37.773%2C-122.413&skip=0&limit=10&user_key=${API_KEY}`;

module.exports = {
  fetchBetterDoctor(req, res, next) {
    const { name } = req.query;
    const queryNames = name.replace(/\s+/g, '%20');
    const url = `${ROOT_URL}&name=${queryNames}`;

    var options = {
      uri: url,
      json: true // Automatically parses the JSON string in the response
    };

    rp(options)
      .then(repos => {
        res.send(repos.data[0].profile);
      })
      .catch(err => {
        next();
      });
  },

  index(req, res, next) {
    const { lng, lat } = req.query;

    Doctor.geoNear(
      { type: 'Point', coordinates: [parseFloat(lng), parseFloat(lat)] },
      { spherical: true, maxDistance: 200000 }
    )
      .then(doctors => res.send(doctors))
      .catch(next);
  },

  create(req, res, next) {
    const doctorProps = req.body;
    Doctor.create(doctorProps)
      .then(doctor => res.send(doctor))
      .catch(next);
  },

  edit(req, res, next) {
    const doctorId = req.params.id;
    const doctorProps = req.body;

    Doctor.findByIdAndUpdate({ _id: doctorId }, doctorProps)
      .then(() => Doctor.findById({ _id: doctorId }))
      .then(doctor => {
        res.send(doctor);
      })
      .catch(next);
  },

  delete(req, res, next) {
    const doctorId = req.params.id;

    Doctor.findByIdAndRemove({ _id: doctorId })
      .then(doctor => {
        res.status(204).send(doctor);
      })
      .catch(next);
  }
};
