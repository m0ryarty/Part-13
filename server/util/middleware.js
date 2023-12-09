const jwt = require('jsonwebtoken')
const Blog = require('../models/blog')
const User = require('../models/user')

const { SECRET } = require('../util/config')
const { TokenValidation } = require('../models')



const blogFinder = async (req, res, next) => {
  req.blog = await Blog.findByPk(req.params.id, {
    include: [{
      model: User,
      attributes: { exclude: ['id', 'createdAt', 'updatedAt' ] }
    },
      {
        model: User,
        as: 'readded_by',
        attributes: {exclude: ['id', 'createdAt', 'updatedAt']},
      through: {
        attributes: []
      }
      }
    ]
  })  
  next()
}

const tokenExtractor = (req, res, next) => {
  const authorization = req.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    
    try {
      req.decodedToken = jwt.verify(authorization.substring(7), SECRET)
      
    } catch{
      return res.status(401).json({ error: 'token invalid' })
    }
  }  else {
    return res.status(401).json({ error: 'token missing' })
  }
  next()
}

const errorHandler = (error, request, response, next) => {
  
  if (error.name === 'SequelizeValidationError') {

    return response.status(400).send(error.message)    
  } else {
    console.error(error.msg) 
  }

   
  next(error)
}

const isAdmin = async (req, res, next) => {
  const user = await User.findByPk(req.decodedToken.id)
  if (!user.admin) {
    return res.status(401).json({ error: 'operation not allowed' })
  }
  next()
}

const isDisabledUser = async (req, res, next) => {  

  const user = await User.findByPk(req.decodedToken.id)  
  if (user.disabled) {    
    return res.status(401).json({
      error: 'account disabled, please contact admin'
    })    
  }
  next()
}

const isValidToken = async (req, res, next) => {
  const tokenValidation = await TokenValidation.findOne({user_id:req.decodedToken.id})
  if (!tokenValidation) {
    return res.status(401).json({
      error: 'You need to login to perform this!'
    })
  }

  next()
}

module.exports = {
  errorHandler,
  blogFinder,
  tokenExtractor,
  isAdmin,
  isDisabledUser,
  isValidToken
}