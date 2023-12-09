const jwt = require('jsonwebtoken')
const router = require('express').Router()
const { tokenExtractor } = require('../util/middleware')
const {TokenValidation} = require('../models')


router.delete('/', tokenExtractor, async (req, res) => {
    console.log(req.decodedToken)

    await TokenValidation.destroy({
        where: {
            user_id: req.decodedToken.id
        }
    })
    
    res.status(204).end()
})
 
module.exports = router