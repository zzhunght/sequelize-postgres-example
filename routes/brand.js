const express = require('express')
const router = express.Router()
// const Brand = require('../Database/Brand')
const {Brand} = require('../Database/init-models')


router.get('/', async function(req, res){
    const resp = await Brand.findAll({
        attributes : ['id', 'brand']
    })
    return res.json(resp)
})
router.post('/', async function(req, res){
    const body = req.body
    const resp = await Brand.create(body)
    return res.json({
        message: 'Alooooo',
        response: resp
    })
})
module.exports = router