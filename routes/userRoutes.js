const express = require('express');
const router = express.Router();
const { authenticate } = require('../middlewares/authMiddleware');
const userController = require('../controllers/userController');

router.use(authenticate);

router.get('/doctors', userController.getAllDoctors);
module.exports = router;