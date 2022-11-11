'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userName: {
        allowNull:false,
        type: Sequelize.STRING
      },
      email: {
        allowNull:false,
        unique: true,
        type: Sequelize.STRING
      },
      userPassword: {
        allowNull:false,
        type: Sequelize.STRING
      },
      roleId: {
        allowNull:false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Roles',
          key:'id'
        },
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE'
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      deletedAt: {
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Users');
  }
};