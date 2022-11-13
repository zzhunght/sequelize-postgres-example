const argon2= require('argon2')
const express = require('express')
const router = express.Router()
const {User,Cart } = require('../Database/init-models')

router.get('/login', async function(req, res){
    try {
        const body = await req.body
        const user = await User.findOne({ 
            where: {
                email: req.body.email
            }
        })
        const compare = await argon2.verify(user.password,body.password)
        if (compare){
            res.json({
                success: true,
                user: user
            })
        }
        return res.json({
            success: false,
            user:{}
        })
    } catch (error) {
        res.json({
            success: false,
            message: error.message
        })
    }
    
})  
router.post('/register', async function(req, res){
    try {
        const body = req.body
        
        const hashpass = await argon2.hash(body.password)
        const newUser = await User.create({
            ...body,
            password: hashpass
        })
        const newCart = await Cart.create({
            userId: newUser.id
        })
        return res.json({
            newCart,
            newUser
        })
    } catch (error) {
        return res.json({
            message: error.message,
            success: false
        })
    }
})
module.exports = router