'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class task extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.User)
    }
  }
  task.init({
    tittle: DataTypes.STRING,
    description: DataTypes.TEXT,
    taskStatusId: DataTypes.INTEGER,
    expirationDate: DataTypes.DATE,
    userId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Task',
    paranoid: true
  });
  return task;
};