const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { body } = require('express-validator');
const validate = require('../middlewares/validate');
//validations

//register validations
const registerValidations = [
    body('name').notEmpty().withMessage('Name is required!'),
    body('email').isEmail().withMessage('Invalid email address!')
    .normalizeEmail(),
    body('password').isLength({min:6}).withMessage('Password must me atleast 6 characters long.'),
    body('role').isIn(['doctor','patient']).withMessage('Role must be either patient or doctor.')
];

//login validations
const loginValidations = [
    body('email').isEmail().withMessage('Invalid email address.'),
    body('password').notEmpty().withMessage('Password is required.')
];



router.post('/register', registerValidations, validate ,authController.register);
router.post('/login',loginValidations, validate ,authController.login);
module.exports = router;