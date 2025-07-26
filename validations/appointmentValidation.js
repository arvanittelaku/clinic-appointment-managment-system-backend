const { body } = require('express-validator');

exports.createAppointmentValidation = [
  body('date').notEmpty().withMessage('Date is required'),
  body('time_slot').notEmpty().withMessage('Time slot is required'),
  body('doctor_id').notEmpty().withMessage('Doctor is required'),
];

exports.updateAppointmentValidation = [
  body('date').optional().isDate().withMessage('Invalid date'),
  body('time_slot').optional().notEmpty().withMessage('Time slot is required'),
  body('status').optional().isIn(['scheduled', 'rescheduled', 'cancelled', 'completed'])
    .withMessage('Invalid status'),
];
