const express = require('express')
const CustomerBuy = require('../models/customerbuy')

const router = new express.Router()



//buy
router.post('/customer/buy', (req, res) => {
    const customerbuy = new CustomerBuy(req.body)

    customerbuy.save().then(() => {
        res.status(201).send(customerbuy)
    }).catch((e) => {
        res.status(400).send(e)
    })
})

//buy request

router.get('/customer/requestbuy', (req,res) => {
    CustomerBuy.find ({}).then((customerbuys) =>{
        res.status(201).send(customerbuys)
    }).catch((e) => {
        res.status(401).json({
            message: "no data"+e
          });
    })
})




module.exports = router



