const { Model, DataTypes } = require('sequelize')

const { sequelize } = require('../util/database')

class TokenValidation extends Model {}

TokenValidation.init({
  id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: { model: 'users', key: 'id' },
        },
        token: {
            type: DataTypes.TEXT,
            allowNull: false,        
            },
        token_is_valid: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        } 
}, {
  sequelize,
  underscored: true,
  timestamps: false,
  modelName: 'token_validations'
})

module.exports = TokenValidation