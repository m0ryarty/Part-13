const router = require('express').Router()
require('express-async-errors')
const { Op } = require('sequelize')


const { isDisabledUser, tokenExtractor } = require('../util/middleware')


const { Blog, User } = require('../models')
const { sequelize } = require('../util/database')

router.get('/',tokenExtractor, isDisabledUser, async (req, res) => {

    const blogsByAuthor = await Blog.findAll({
        attributes: [
            'author',
            [ sequelize.fn('COUNT', sequelize.col('blogs.id')), 'articles' ],
            [sequelize.fn('SUM', sequelize.col('blogs.likes')), 'likes']
        ],
        group: [ 'author' ],
        order: [['likes', 'DESC']]

    })

    res.json(blogsByAuthor)
}) 
module.exports = router