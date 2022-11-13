const express = require('express')
const router = express.Router()
// const Category = require('../Database/Categories')
const {Categories} = require('../Database/init-models')

router.get('/', async function(req, res){
    const resp = await Categories.findAll({
        attributes : ['id', 'label']
    })
    return res.json(resp)
})
router.post('/', async function(req, res){
    const body = req.body
    const resp = await Categories.create(body)
    return res.json({
        message: 'Alooooo',
        response: resp
    })
})
module.exports = router