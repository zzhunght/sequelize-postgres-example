const express = require('express')
// const { Op } = require('sequelize/types/operators')
const router = express.Router()
// const Product = require('../Database/model')
const {Products,Brand ,Categories} = require('../Database/init-models')
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
// const Brand = require('../Database/Brand')

router.get('/', async function(req, res){
    const page  = req.query.page || 1
    console.log(page)
    const start = Number(page -1) * 20
    const resp = await Products.findAll({
        attributes:['id','name','description','price','discount','image'],
        include:[
            {
                model:Brand,
                as:'Brand',
                attributes:['brand','id']
            },{
                model:Categories,
                as:'Category',
                attributes:['label','id']
            }
        ],
        offset:start,
        limit:20
    })
    return res.json(resp)
})
router.get('/search', async (req, res) => {
    const search = req.query.search
    try {
        const resp = await Products.findAll({
            attributes:['id','name','description','price','discount','image'],
            where: {
                name: {
                    [Op.iLike]: `%${search}%`
                },

            },
            include:[
                {
                    model:Brand,
                    as:'Brand',
                    attributes:['brand','id']
                },{
                    model:Categories,
                    as:'Category',
                    attributes:['label','id']
                }
            ],
        })
        return res.json(resp)
    }
    catch (err) {
         return res.json({ error: err.message})
    }
})
router.get('/bycategory/:id', async function(req, res){
    const id = req.params.id
    const page  = req.query.page || 1
    const start = Number(page -1) * 20
    const resp = await Products.findAll({
        attributes:['id','name','description','price','discount','image'],
        include:[
            {
                model:Brand,
                as:'Brand',
                attributes:['brand','id']
            },{
                model:Categories,
                as:'Category',
                attributes:['label','id']
            }
        ],

        where: {
            CategoryId:id
        },
        offset: start,
        limit:20
    })
    return res.json(resp)
})

router.post('/', async function(req, res){
    console.log('create new prod',req.body)
    try {
        const body = req.body
        const resp = await Products.create(body)
        return res.json({
            success: true,
        })
    } catch (error) {
        return res.json({
            success: false
        })
    }
})
router.post('/update/:id', async function(req, res){
    try {
        console.log('update',req.body)
        const id = req.params.id
        const body = req.body
        const prod = await Products.findByPk(id)
        await prod.set(body)
        await prod.save()
        return res.json({
            success: true,
        })
    } catch (error) {
        return res.json({
            success: false
        })
    }
})
module.exports = router