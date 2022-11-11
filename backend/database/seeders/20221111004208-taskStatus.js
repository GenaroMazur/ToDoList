'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const date = new Date()
    await queryInterface.bulkInsert("taskstatuses",[
      {
        id:1,
        status:"pending",
        description: "tarea que esta pendiente a realizarse",
        updatedAt:date,
        createdAt:date
      },
      {
        id:2,
        status:"doing",
        description: "tarea que se esta realizando",
        updatedAt:date,
        createdAt:date
      },
      {
        id:3,
        status:"finished",
        description: "tarea terminada",
        updatedAt:date,
        createdAt:date
      },
      {
        id:4,
        status:"expired",
        description: "tarea que paso su fecha de caducidad sin haberse realizado",
        updatedAt:date,
        createdAt:date
      }
    ],{})
  },

  down: async (queryInterface, Sequelize)=> {
    await queryInterface.bulkDelete('taskstatuses', null, {})
  }
};
