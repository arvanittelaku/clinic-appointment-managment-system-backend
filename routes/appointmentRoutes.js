const express = require('express');
const router = express.Router();

const appointmentController = require('../controllers/appointmentController');
const { authenticate, allowRoles } = require('../middlewares/authMiddleware');
const authorize = require('../middlewares/authorize');

const {
  createAppointmentValidation,
  updateAppointmentValidation,
} = require('../validations/appointmentValidation'); 

const validate = require('../middlewares/validate');
router.use(authenticate);
router.get('/available-slots',allowRoles('patient','doctor'), appointmentController.getAvailableSlots);
router.post(
  '/',
  allowRoles('patient'),
  createAppointmentValidation,
  validate,
  appointmentController.createAppointment
);


router.get('/',allowRoles('doctor','patient'), appointmentController.getAppointments);
router.get('/:id', allowRoles('patient', 'doctor', 'admin', 'receptionist'), appointmentController.getAppointmentById);
router.patch(
  '/:id',
  allowRoles('patient', 'doctor'),
  updateAppointmentValidation,
  validate,
  appointmentController.updateAppointment
);

router.delete('/:id',allowRoles('patient', 'admin'), appointmentController.deleteAppointment);

module.exports = router;
