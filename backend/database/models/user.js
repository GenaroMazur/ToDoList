'use strict';
const JWT = require("jsonwebtoken")
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Role,{
        "foreingKey":"roleId"
      })
      this.hasMany(models.Task,{
        "foreingKey":"userId",
        "as":"Task"
      })
    }
    generateAuthToken() {
      return JWT.sign({ id: this.id }, process.env.SECRET_WORD);
    }
  }
  User.init({
    userName: DataTypes.STRING,
    email: DataTypes.STRING,
    userPassword: DataTypes.STRING,
    roleId: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'User',
    paranoid: true
  });
  return User;
};