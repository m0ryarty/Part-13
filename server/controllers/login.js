const jwt = require('jsonwebtoken')
const router = require('express').Router()

const { SECRET } = require('../util/config')
const User = require('../models/user')
const TokenValidation = require('../models/token_validation')

router.post('/', async (req, res) => {
  const body = req.body

  
  const user = await User.findOne({
    where: {
      username: body.username
    }
  })

  const passwordCorrect = body.password === 'secret'

  if (!(user && passwordCorrect)) {
    return res.status(401).json({
      error: 'invalid username or password'
    })
  }

  if (user.disabled) {
    return res.status(401).json({
      error: 'account disabled, please contact admin'
    })
  }

  const userForToken = {
    username: user.username,
    id: user.id,
  }  

  const token = jwt.sign(userForToken, SECRET)

  await TokenValidation.create({
    user_id: user.id,
    token,
    token_is_valid: true
  })

  res
    .status(200)
    .send({ token, username: user.username, name: user.name })
})

module.exports = router