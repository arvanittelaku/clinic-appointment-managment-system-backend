const express = require('express');
const router = express.Router();

const { authenticate, allowRoles } = require('../middlewares/authMiddleware');
const receptionistController = require('../controllers/receptionistController');
router.use(authenticate);
router.use(allowRoles('receptionist'));


router.get('/appointments', receptionistController.getAllAppointments);
router.get('/patients', receptionistController.getAllPatients);
router.post('/appointments', receptionistController.createAppointment);
router.put('/appointments/:id', receptionistController.updateAppointment);
router.delete('/appointments/:id', receptionistController.deleteAppointment);
router.get('/appointments/search', receptionistController.searchAppointments);

module.exports = router;
