'use strict';

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING, 
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM('admin', 'doctor', 'receptionist', 'patient'),
      allowNull: false,
      defaultValue: 'patient'
    }
  }, {
    tableName: 'users',
    freezeTableName: true,
    timestamps: true 
  });

  User.associate = (models) => {
    User.hasMany(models.Appointment, { foreignKey: 'doctor_id', as: 'doctorAppointments' });
    User.hasMany(models.Appointment, { foreignKey: 'patient_id', as: 'patientAppointments' });
  };

  return User; 
};
