const express = require('express');
const router = express.Router();
const appointmentController = require('../controllers/appointment.controller');
const authenticate = require('../middlewares/auth.middleware');
const { allowRoles } = require('../middlewares/authMiddleware');

router.post('/', authenticate,allowRoles('admin,receptionist') ,appointmentController.createAppointment);
router.get('/', authenticate,allowRoles('admin','receptionist'), appointmentController.getAppointments);
router.get('/:id', authenticate, appointmentController.getAppointmentById);
router.put('/:id', authenticate,allowRoles('admin','receptionist'), appointmentController.updateAppointment);
router.delete('/:id', authenticate,allowRoles('admin','receptionist'), appointmentController.deleteAppointment);

module.exports = router;
