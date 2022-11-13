const express = require('express')
const router = express.Router()
// const Product = require('../Database/model')
const {Products,Brand } = require('../Database/init-models')
// const Brand = require('../Database/Brand')

router.get('/', async function(req, res){
    const resp = await Products.findAll({
        attributes:['id','name','description','price','discount','image'],
        include:{
            model:Brand,
            as:'Brand',
            attributes:['brand','id']
        },
    })
    return res.json(resp)
})
router.get('/bycategory/:id', async function(req, res){
    const id = req.params.id

    const resp = await Products.findAll({
        attributes:['id','name','description','price','discount','image'],
        include:{
            model:Brand,
            as:'Brand',
            attributes:['brand','id']
        },
        where: {
            CategoryId:id
        }
    })
    return res.json(resp)
})
router.get('/', async function(req, res){
    const resp = await Products.findAll({
        attributes:['id','name','description','price','discount','image'],
        include:{
            model:Brand,
            attributes:['brand','id']
        },
    })
    return res.json(resp)
})
router.post('/', async function(req, res){
    const body = req.body
    const resp = await Products.create(body)
    return res.json({
        message: 'Alooooo',
        response: resp
    })
})
router.post('/update/:id', async function(req, res){
    const id = req.params.id
    const body = req.body
    const prod = await Products.findByPk(id)
    await prod.update(body)
    return res.json({
        message: 'Alooooo',
        response: prod
    })
})
module.exports = router