'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const date = new Date()
    const expirationDate = new Date(2022,11,20)
    const pendingId = 1
    const doingId = 2
    const finishedId = 3
    const expiredId = 4
    await queryInterface.bulkInsert("tasks",[
      {
        id:1,
        tittle:"terminar toDoList api",
        description:"debo terminar esta api",
        taskStatusId:2,
        expirationDate:expirationDate,
        createdAt:date,
        updatedAt:date,
        userId:1
      }
    ],{})
  },

  down: async (queryInterface, Sequelize)=> {
    await queryInterface.bulkDelete('tasks', null, {})
  }
};
