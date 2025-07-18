const { Appointment, User } = require('../models');

// Create appointment
exports.createAppointment = async (req, res) => {
  try {
    const { doctor_id, patient_id, date, time_slot, status } = req.body;

    const appointment = await Appointment.create({
      doctor_id,
      patient_id,
      date,
      time_slot,
      status,
    });

    res.status(201).json(appointment);
  } catch (err) {
    res.status(500).json({ message: 'Failed to create appointment', error: err.message });
  }
};

// Get all appointments
exports.getAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.findAll({
      include: [
        { model: User, as: 'doctor', attributes: ['id', 'name'] },
        { model: User, as: 'patient', attributes: ['id', 'name'] },
      ],
    });

    res.status(200).json(appointments);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch appointments', error: err.message });
  }
};

// Get appointment by ID
exports.getAppointmentById = async (req, res) => {
  try {
    const appointment = await Appointment.findByPk(req.params.id);

    if(!appointment) return res.status(404).json({message: 'Appointment not found!'});

    const {role, id:userId } = req.user;

    if(role === 'admin' || role === 'receptionist') {
        return res.json(appointment);
    }

    if(
        (role === 'doctor' && appointment.doctor_id !== userId) ||
        (role === 'patient' && appointment.patient_id !== userId)
    ) {
        return res.status(403).json({message:'Forbidden'});
    }
    res.json(appointment);
  }catch(err) {
    next(err);
  }
};

// Update appointment
exports.updateAppointment = async (req, res) => {
  try {
    const { id } = req.params;
    const { doctor_id, patient_id, date, time_slot, status } = req.body;

    const appointment = await Appointment.findByPk(id);

    if (!appointment) return res.status(404).json({ message: 'Appointment not found' });

    await appointment.update({ doctor_id, patient_id, date, time_slot, status });

    res.status(200).json(appointment);
  } catch (err) {
    res.status(500).json({ message: 'Error updating appointment', error: err.message });
  }
};

// Delete appointment
exports.deleteAppointment = async (req, res) => {
  try {
    const { id } = req.params;

    const appointment = await Appointment.findByPk(id);
    if (!appointment) return res.status(404).json({ message: 'Appointment not found' });

    await appointment.destroy();

    res.status(204).send();
  } catch (err) {
    res.status(500).json({ message: 'Error deleting appointment', error: err.message });
  }
};
