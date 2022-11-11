'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('tasks', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      tittle: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.TEXT
      },
      taskStatusId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'taskStatuses',
          key:'id'
        },
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE'
      },
      expirationDate: {
        type: Sequelize.DATE
      },
      userId: {
        type: Sequelize.INTEGER
      },
      deletedAt: {
        type: Sequelize.DATE
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
    await queryInterface.dropTable('tasks');
  }
};