const { AppointmentLog, User } = require('../models');
exports.createLog = async ({appointmentId, action, performedBy}) => {
    try {
        return await AppointmentLog.create({appointmentId,action,performedBy});
    }catch(error) {
        console.error('Error creating appointment log: ', err);
        throw err;
    }
};

exports.getLogsByAppointment = async (req,res) => {
    const { appointmentId } = req.params;
    try {
        const logs = await AppointmentLog.findAll({
            where: {appointmentId},
            include: [
                {model:User, attributes: ['id','name','role']}
            ],
            order:[['createdAt','DESC']]
        });
        res.status(200).json(logs);
    }catch(err) {
        res.status(500).json({message: 'Failed to fetch logs',error:err.message});
    }
};