const { Model, DataTypes } = require('sequelize')

const { sequelize } = require('../util/database')

class User extends Model {}

User.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  username: {
    type: DataTypes.STRING,
    validate: {isEmail:{
      msg: 'Username must be an e-mail address'
    }},
    unique: true,
    allowNull: false
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  admin: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  disabled: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
}, {
  sequelize,
  underscored: true,  
  modelName: 'users'
})

module.exports = User