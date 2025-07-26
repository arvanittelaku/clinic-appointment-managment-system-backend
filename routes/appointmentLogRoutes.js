const express = require('express');
const router = express.Router();
const appointmentLogController = require('../controllers/appointmentLogController');
const { authenticate } = require('../middlewares/authMiddleware');

router.use(authenticate);

router.get('/appointment/:appointmentId', appointmentLogController.getLogsByAppointment);

module.exports = router;
