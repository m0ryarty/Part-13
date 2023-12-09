const router = require('express').Router()
const { Op } = require('sequelize')
const {tokenExtractor, isAdmin, isDisabledUser} = require('../util/middleware')


const { User, Blog } = require('../models')

router.get('/', async (req, res) => {
  
  const users = await User.findAll({
    include: [{
      model: Blog,
      attributes: { exclude: ['userId'] }
    },
    {
      model: Blog,
      as: 'readded_blog',
      attributes: { exclude: [ 'userId', 'id', 'createdAt',, 'updatedAt' ] },
      through: {
        attributes: []
      },
    }]
  })
  res.json(users)
})

router.post('/', async (req, res) => {

  
    const user = await User.create(req.body)
    res.json(user)
  
})

router.get('/:id',tokenExtractor, isDisabledUser, async (req, res) => {
  
  if (req.query.read) {
    console.log('query')
    const user = await User.findOne({

    where: {
      id: req.params.id      
    },
    
    attributes: {exclude: ['id', 'createdAt', 'updatedAt']},      
    
    include:       
      {
      model: Blog,
      as: 'readded_blog',
      attributes: { exclude: [ 'userId', 'id', 'createdAt',, 'updatedAt' ] },
      through: {
        attributes: ['read', 'id'],
      where: {                
        read: req.query.read
      }
      }
    },  
     
  })
  if (user) {
    res.json(user)
  } else {
    res.status(404).end()
  } 
  } else {
    console.log('no query')
    const user = await User.findOne({

    where: {
      id: req.params.id      
    },
    
    attributes: {exclude: ['id', 'createdAt', 'updatedAt']},      
    
    include:       
      {
      model: Blog,
      as: 'readded_blog',
      attributes: { exclude: [ 'userId', 'id', 'createdAt',, 'updatedAt' ] },
      through: {
        attributes: ['read', 'id'],
      }
    },  
     
  })
  if (user) {
    res.json(user)
  } else {
    res.status(404).end()
  }
  }

  
})

router.put('/:username',tokenExtractor, isDisabledUser, async (req, res) => {
  
  const user = await User.findOne({
    where: {
       username: req.params.username
     }
   })
  console.log(req.body.username)
  
  if (user) {   
    user.username = req.body.username
    await user.save()
    res.json({username:user.username})
  } else {
    res.status(404).end()
  }
})

router.put('/:username', tokenExtractor, isAdmin, async (req, res) => {
  const user = await User.findOne({
    where: {
      username: req.params.username
    }
  })

  if (user) {
    user.disabled = req.body.disabled
    await user.save()
    res.json(user)
  } else {
    res.status(404).end()
  }
})

module.exports = router