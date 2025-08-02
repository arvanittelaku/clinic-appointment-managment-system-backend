const { Appointment, User } = require('../models');


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