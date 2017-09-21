const DoctorsController = require('../controllers/doctors_controller');

module.exports = app => {
  app.get('/better-doctor-api/doctors', DoctorsController.fetchBetterDoctor);

  app.post('/api/doctors', DoctorsController.create);
  app.put('/api/doctors/:id', DoctorsController.edit);
  app.delete('/api/doctors/:id', DoctorsController.delete);
  app.get('/api/doctors', DoctorsController.index);
};
