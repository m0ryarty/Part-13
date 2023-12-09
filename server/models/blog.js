const { Model, DataTypes } = require('sequelize')

const { sequelize } = require('../util/database')



class Blog extends Model {}
Blog.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  author: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  url: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  title: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  likes: {
    type: DataTypes.INTEGER
  },  
  year: {
    type: DataTypes.INTEGER,
    validate: {
      yearValidator () {
        if (this.year < 1991 || this.year > new Date().getFullYear()) {
          throw new Error('Invalid year, must be less then actual and after 1991')
        }
      }
         
  }
  },
  
}, {
  sequelize,
  underscored: true,  
  modelName: 'blogs'
})

module.exports = Blog