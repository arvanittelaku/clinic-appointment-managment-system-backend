'use strict';

module.exports = (sequelize, DataTypes) => {
  const Appointment = sequelize.define('Appointment', {
    doctor_id: DataTypes.UUID,
    patient_id: DataTypes.UUID,
    date: DataTypes.DATE,
    time_slot: DataTypes.STRING,
    status: DataTypes.STRING
  }, {
    tableName: 'appointments',
    timestamps: true,
  });

  Appointment.associate = (models) => {
    Appointment.belongsTo(models.User, { foreignKey: 'doctor_id', as: 'doctor' });
    Appointment.belongsTo(models.User, { foreignKey: 'patient_id', as: 'patient' });
  };

  return Appointment;
};
