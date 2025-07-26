const express = require('express');
const router = express.Router();

const appointmentController = require('../controllers/appointmentController');
const { authenticate } = require('../middlewares/authMiddleware');
const authorize = require('../middlewares/authorize');

const {
  createAppointmentValidation,
  updateAppointmentValidation,
} = require('../validations/appointmentValidation'); 

const validate = require('../middlewares/validate');
router.use(authenticate);
router.get('/available-slots', appointmentController.getAvailableSlots);
router.post(
  '/',
  createAppointmentValidation,
  validate,
  appointmentController.createAppointment
);


router.get('/', appointmentController.getAppointments);
router.get('/:id', appointmentController.getAppointmentById);
router.patch(
  '/:id',
  updateAppointmentValidation,
  validate,
  appointmentController.updateAppointment
);

router.delete('/:id', appointmentController.deleteAppointment);

module.exports = router;
