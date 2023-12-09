const Blog = require('./blog')
const ReadingList = require('./reading_list')
const User = require('./user')
const TokenValidation = require('./token_validation')

User.hasMany(Blog)
Blog.belongsTo(User)

User.belongsToMany(Blog, { through: ReadingList, as: 'readded_blog' })
Blog.belongsToMany(User, { through: ReadingList, as: 'readded_by' })

module.exports = {
  Blog,
  User,
  ReadingList,
  TokenValidation
}