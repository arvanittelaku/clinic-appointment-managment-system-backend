'use strict';
module.exports = (sequelize, DataTypes) => {
  const AppointmentLog = sequelize.define('AppointmentLog', {
    appointmentId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    action: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    performedBy: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    tableName: 'appointment_logs',
    timestamps: true,
  });

  AppointmentLog.associate = (models) => {
    AppointmentLog.belongsTo(models.Appointment, { foreignKey: 'appointmentId' });
  };

  return AppointmentLog;
};
