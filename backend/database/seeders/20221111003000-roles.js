'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const date = new Date()
    await queryInterface.bulkInsert("roles",[
      {
        id:1,
        name:"admin",
        createdAt:date,
        updatedAt:date
      },
      {
        id:2,
        name:"user",
        createdAt:date,
        updatedAt:date
      }
    ],{})
  },

  down: async (queryInterface, Sequelize)=> {
    await queryInterface.bulkDelete('roles', null, {})
  }
};
