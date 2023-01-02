const argon2= require('argon2')
const express = require('express')
const router = express.Router()
const {User,Cart,CartDetails,Products,Brand } = require('../Database/init-models')

router.post('/login', async function(req, res){
    console.log('aaaa',req.body)
    try {
        const body = await req.body
        const user = await User.findOne({ 
            attributes:['id','name','password','phone','address','email','gender'],
            where: {
                email: req.body.email
            },
            include: {
                model: Cart,
                as:'Carts',
                attributes:['id', 'userId'],
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
            },
        })
        const compare = await argon2.verify(user.password,body.password)
        if (compare){
            delete user.dataValues.password
            console.log(user)
            return res.json({
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
    console.log("dang kys",req.body)
    try {
        const body = req.body
        const user = await User.findOne({
            where: {
                email: req.body.email
            }
        })
        if(!user){
            const hashpass = await argon2.hash(body.password)
            const newUser = await User.create({
                ...body,
                password: hashpass
            })
            const newCart = await Cart.create({
                userId: newUser.id
            })
            return res.json({
                success:true,
                message:"Dang kys thanh cong"
            })
        }
        return res.json({
            message: "Dang ky that bai",
            success: false
        })
    } catch (error) {
        return res.json({
            message: "Dang ky that bai",
            success: false
        })
    }
})
module.exports = router