    const { Appointment, User } = require('../models');
    const { Op } = require('sequelize');


    exports.getAllAppointments = async (req,res,next) => {
        try {
            const appointments = await Appointment.findAll({include: ['doctor','patient']});
            if(!appointments) res.status(404).json({message: 'No appointments found!'});
            res.json(appointments);
        }catch(err) {
            next(err);
        }
    };

    exports.getAllPatients = async (req,res,next) => {
        try {
            const patients = await User.findAll({
                where: {role: 'patient'},
                attributes: {exclude: ['password']},
            });
            res.json(patients);
        }catch(err) {
            next(err);
        }
    };

   exports.createAppointment = async (req, res, next) => {
  try {
    const { patientId, doctorId, date, time } = req.body;

    if (!patientId || !doctorId || !date || !time) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    const appointment = await Appointment.create({
      patient_id: patientId,
      doctor_id: doctorId,
      date,
      time_slot: time
    });

    res.status(201).json({ message: 'Appointment created successfully.', appointment });
  } catch (err) {
    next(err);
  }
};


 exports.updateAppointment = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { date, time, doctorId } = req.body;

        const appointment = await Appointment.findByPk(id);
        if (!appointment) return res.status(404).json({ message: 'Appointment not found' });

        await appointment.update({ date, time, doctorId });

        res.json({ message: 'Appointment updated successfully', appointment });
    } catch (err) {
        next(err);
    }
    };
    exports.deleteAppointment = async (req, res, next) => {
    try {
        const { id } = req.params;

        const appointment = await Appointment.findByPk(id);
        if (!appointment) return res.status(404).json({ message: 'Appointment not found' });

        await appointment.destroy();

        res.json({ message: 'Appointment deleted successfully' });
    } catch (err) {
        next(err);
    }
    };



exports.searchAppointments = async (req, res, next) => {
  try {
    const { date, doctorId } = req.query;
    const where = {};

    if (date) {
      const dayStart = new Date(date);
      dayStart.setHours(0, 0, 0, 0);

      const dayEnd = new Date(date);
      dayEnd.setHours(23, 59, 59, 999);

      where.date = {
        [Op.between]: [dayStart, dayEnd],
      };
    }

    if (doctorId) {
      where.doctor_id = doctorId.trim();
    }

    const appointments = await Appointment.findAll({
      where,
      include: [
        {
          association: 'doctor',
          attributes: { exclude: ['password'] },
        },
        {
          association: 'patient',
          attributes: { exclude: ['password'] },
        },
      ],
    });

    res.json(appointments);
  } catch (err) {
    next(err);
  }
};






