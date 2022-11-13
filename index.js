const express = require('express');
const cors = require('cors');
const app = express();


app.use(cors())
app.use(express.json())


const CategoryRoute = require('./routes/category')
const BrandRoute = require('./routes/brand')
const ProductRoute = require('./routes/product')
const UserRoute = require('./routes/user')
const CartRoute = require('./routes/cart')
app.use('/category',CategoryRoute)
app.use('/product', ProductRoute)
app.use('/brand', BrandRoute)
app.use('/user', UserRoute)
app.use('/cart', CartRoute)
app.listen(5000,()=> console.log('listening on port'))