const express = require('express')
const sequelize = require('../Database/DB')
const route = express.Router()
const {Cart, CartDetails} = require('../Database/init-models')


route.get('/:id', async (req, res) => {
   try {
        // const cart = await Cart.findOne({
        //     attributes:['id'],
        //     where:{
        //         userId:req.params.id
        //     }
        // })
        // // const cart = await sequelize.query(`select * from "Cart"  join "CartDetails" on "Cart".id = "CartDetails"."cartId"`)
        // const cartDetails = await CartDetails.findAll({
        //     where: {
        //         cartId:cart.id
        //     }
        // })
        // res.json({
        //     cartDetails: cartDetails,
        //     cart
        // })

        const cart = await Cart.findOne({
            where:{
                userId:req.params.id
            },
            include:{
                model: CartDetails,
                as:'CartDetails'
            }
        })
        return res.json(cart)
   }
   catch (err) {
        return res.json({ error: err.message})
   }
})


route.post('/', async (req, res) => {
    try {
        const body = req.body
        const resp = body.map(async(item)=>{
            const newItem = await CartDetails.create(item)
            return newItem
        })
        res.json(resp)
    }
    catch (err) {
        return res.json({ error: err.message})
    }
 })



module.exports = route