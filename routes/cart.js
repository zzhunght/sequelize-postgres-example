const express = require('express')
const route = express.Router()
const {Cart, CartDetails, Products,Brand} = require('../Database/init-models')


route.get('/:id', async (req, res) => {
   try {
        const cart = await Cart.findOne({
            attributes:['id','userId'],
            where:{
                userId:req.params.id
            },
            include:{
                attributes:['id','cartId','productId','amount'],
                model: CartDetails,
                as:'CartDetails',
                include:{
                    attributes:['id','name','description','price','discount','image'],
                    model:Products,
                    as:'product',
                    include:{
                        model:Brand,
                        as:'Brand',
                        attributes:['brand','id']
                    }
                }
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
        console.log(req.body)
        const body = req.body
        const item = await CartDetails.findOne({
            where: {
                productId: req.body.productId,
                cartId: req.body.cartId
            }
        })
        if(!item) {
            const newItem = await CartDetails.create(body)
            console.log(newItem)
            res.json({
                success: true,
            })
        }
        else {
            item.set({
                amount: Number(item.amount) +1
            })
            await item.save()
            res.json({
                success: true,
            })
        }
    }
    catch (err) {
        return res.json({success:false})
    }
 })
route.delete('/', async (req, res) => {
    try {
        const id = req.query.id
        console.log("delete",id)
        await CartDetails.destroy({
            where: {
                id: id,
            }
        })
        res.json({
            success: true,
        })
    }
    catch (err) {
        console.log(err.message)
        return res.json({success:false})
    }
 })


module.exports = route