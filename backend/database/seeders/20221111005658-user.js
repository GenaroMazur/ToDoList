'use strict';
const bcrypt = require("bcryptjs")
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const date = new Date()
    const password = bcrypt.hashSync("password")
    const adminId = 1
    const userId = 2
    await queryInterface.bulkInsert("users",[
      {
        id:1,
        userName:"genaro",
        email:"genaromazur@gmail.com",
        userPassword:password,
        roleId:1,
        createdAt:date,
        updatedAt:date
      },
      {
        id:2,
        userName:"raul",
        email:"raul@gmail.com",
        userPassword:password,
        roleId:2,
        createdAt:date,
        updatedAt:date
      }
    ],{})
  },

  down: async (queryInterface, Sequelize)=> {
    await queryInterface.bulkDelete('users', null, {})
  }
};
