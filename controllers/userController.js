const { where } = require('sequelize');
const { User } = require('../models');

exports.getAllDoctors = async (req,res) => {
    try {
        const doctors = await User.findAll({where: {role: 'doctor' }, attributes: ['id','name','email']});
        res.json(doctors);
    }catch(err) {
        res.status(500).json({ message: 'Failed to fetch doctors', error: err.message });
    }
};