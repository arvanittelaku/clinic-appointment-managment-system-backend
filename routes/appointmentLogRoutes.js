const express = require('express');
const router = express.Router();
const appointmentLogController = require('../controllers/appointmentLogController');
const { authenticate,allowRoles } = require('../middlewares/authMiddleware');

router.use(authenticate);

router.get('/appointment/:appointmentId',allowRoles('doctor', 'patient', 'admin'), appointmentLogController.getLogsByAppointment);

module.exports = router;
