const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const { authenticate, allowRoles } = require('../middlewares/authMiddleware');
const { body } = require('express-validator');
const validate = require('../middlewares/validate');

const updateUserValidation = [
  body('email').optional().isEmail().withMessage('Must be a valid email'),
  body('role').optional().isIn(['doctor', 'patient', 'admin'])
    .withMessage('Role must be one of doctor, patient, admin'),
];
router.use(authenticate, allowRoles('admin'));

router.get('/users', adminController.getAllUsers);
router.get('/users/:id', adminController.getUserById);
router.patch('/users/:id',updateUserValidation,validate, adminController.updateUser);
router.delete('/users/:id', adminController.deleteUser);

router.get('/appointments', adminController.getAllAppointments);

module.exports = router;
