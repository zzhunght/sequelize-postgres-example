const express = require('express')
const route = express.Router()
const {Order, OrderDetails, Products} = require('../Database/init-models')

route.get('/:id' , async(req, res)=>{
    try {
        const userId = req.params.id
        const resp = await Order.findAll({
            where:{
                userId
            },
            include:{
                model: OrderDetails,
                as:'OrderDetails',
                include:{
                    model:Products,
                    as:'product'
                }
            }
        })
        return res.json(resp)
    } catch (error) {
        
    }
})


route.post('/', async(req, res)=>{
    try {
        const body = req.body
        const orderForm = {
            status: 'pending',
            address:body.address,
            userId: body.userId
        }
        const orderDetailsForm = body.orderItem
        const order = await Order.create(orderForm)
        const resp = []
        orderDetailsForm.forEach(async(item) =>{
            const newItem = await OrderDetails.create({
                ...item,
                orderId:order.id
            })
            resp.push(newItem)
        })
        return res.json({
            order,
            resp
        })
    } catch (error) {
        res.json({ error :error.message })
    }

})





module.exports = route