const express = require('express')
const CustomerSell = require('../models/customersell')
const router = new express.Router()



//sell
router.post('/customer/sell', (req, res) => {
    const customersell = new CustomerSell(req.body)

    customersell.save().then(() => {
        res.status(201).send(customersell)
    }).catch((e) => {
        res.status(400).send(e)
    })
})

//getting customer request sell

router.get('/customer/requestsell', (req,res) => {
    CustomerSell.find ({}).then((customersells) =>{
        res.status(201).send(customersells)
    }).catch((e) => {
        res.status(401).json({
            message: "no data"+e
          });
    })
})



module.exports = router



