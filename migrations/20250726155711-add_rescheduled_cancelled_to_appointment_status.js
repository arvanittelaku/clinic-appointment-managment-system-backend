'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    
    await queryInterface.sequelize.query(`
      ALTER TYPE enum_appointments_status ADD VALUE IF NOT EXISTS 'rescheduled';
    `);

    await queryInterface.sequelize.query(`
      ALTER TYPE enum_appointments_status ADD VALUE IF NOT EXISTS 'cancelled';
    `);
  },

  down: async (queryInterface, Sequelize) => {
    
  }
};
