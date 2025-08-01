const express = require('express');
const router = express.Router();
const { authenticate,allowRoles } = require('../middlewares/authMiddleware');
const userController = require('../controllers/userController');

router.use(authenticate);

router.get('/doctors',allowRoles('patient','admin'), userController.getAllDoctors);
router.get('/me',userController.getCurrentUser)
module.exports = router;