'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('appointments', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      doctor_id: {
        type: Sequelize.UUID
      },
      patient_id: {
        type: Sequelize.UUID
      },
      date: {
        type: Sequelize.DATE
      },
      time_slot: {
        type: Sequelize.STRING
      },
      status: {
         type: Sequelize.ENUM('scheduled', 'completed', 'canceled'),
         allowNull: false,
         defaultValue: 'scheduled',
        },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Appointments');
  }
};