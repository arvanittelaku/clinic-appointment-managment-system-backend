const express = require('express');
const router = express.Router();
const appointmentController = require('../controllers/appointmentController');
const { authenticate } = require('../middlewares/authMiddleware');

router.use(authenticate);

router.post('/', appointmentController.createAppointment);

router.get('/', appointmentController.getAppointments);
router.get('/:id', appointmentController.getAppointmentById);

router.patch('/:id', appointmentController.updateAppointment);

router.delete('/:id', appointmentController.deleteAppointment);

router.get('/available-slots', appointmentController.getAvailableSlots);
module.exports = router;
