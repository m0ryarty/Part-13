const router = require('express').Router()
require('express-async-errors')
const { tokenExtractor, isDisabledUser } = require('../util/middleware')

const { ReadingList } = require('../models')

router.post('/', tokenExtractor, async (req, res) => {  
    
    const readingList = await ReadingList.create({...req.body, userId: req.decodedToken.id})
    res.json(readingList)  
})

router.put('/:id', tokenExtractor, isDisabledUser, async (req, res) => {

    
    if (req.decodedToken) {

        const readdedBlog = await ReadingList.findByPk(req.params.id)
        
        readdedBlog.read = req.body.read
        
        await readdedBlog.save()    
                
        res.send(readdedBlog)
    }
})

module.exports = router