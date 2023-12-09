const router = require('express').Router()
require('express-async-errors')
const { Op } = require('sequelize')

const {blogFinder, tokenExtractor, isDisabledUser, isValidToken} = require('../util/middleware')

const { Blog, User } = require('../models')


router.get('/', async (req, res) => {
  const searchQuery = {[Op.iLike]: req.query.search ? `%${req.query.search}%` : `%%`}
  const blogs = await Blog.findAll({
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
    ],

    where: {
      [ Op.or ]: {
        title: searchQuery,
        author: searchQuery        
      }
    },    
    order: [['likes', 'DESC']]
  })
  
  res.json(blogs)
})

router.post('/',tokenExtractor, isDisabledUser,isDisabledUser, isValidToken, async (req, res) => {  
    const user = await User.findOne()
    const blog = await Blog.create({...req.body, userId: user.id})
    res.json(blog)  
}) 

router.get('/:id', blogFinder, async (req, res) => {  
  if (req.blog) {
    res.json(req.blog)
  } else {
    res.status(404).end()
  }
})

router.delete('/:id',tokenExtractor, blogFinder,isDisabledUser,isValidToken, async (req, res) => {

  if (req.blog.dataValues.userId === req.decodedToken.id) {    
    await req.blog.destroy()
  }
  res.status(204).end()
})

router.put('/:id',tokenExtractor, isDisabledUser, blogFinder, isValidToken, async (req, res) => {
  if (req.blog) {   
    req.blog.likes = req.body.likes
    await req.blog.save()
    res.json({likes:req.blog.likes})
  } else {
    res.status(404).end()
  }
})

module.exports = router