const express = require('express')


const tempuserrouter = require('./src/routers/r-temp_user')
const userrouter = require('./src/routers/r-user')
const sellrouter = require('./src/routers/r-sell')
const buyrouter = require('./src/routers/r-buy')
const buyedrouter = require('./src/routers/r-buyed')
const selledrouter = require('./src/routers/r-selled')
const productrouter = require('./src/routers/r-product')
const messagerouter = require('./src/routers/r-message')
const sellrejectedrouter = require('./src/routers/r-sell_rejected')
const buyrejectedrouter = require('./src/routers/r-buy_rejected')

const morgan = require('morgan')

const app = express()

const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/neera', {
    useNewUrlParser: true,
    useUnifiedTopology: true
},()=>{
    console.log('DB Connected')
})

app.use(morgan('dev'))
app.use(express.json())
app.use(tempuserrouter)
app.use(userrouter)
app.use(sellrouter)
app.use(buyrouter)
app.use(buyedrouter)
app.use(selledrouter)
app.use(productrouter)
app.use(messagerouter)
app.use(sellrejectedrouter)
app.use(buyrejectedrouter)




app.listen(process.env.PORT || 3000)

