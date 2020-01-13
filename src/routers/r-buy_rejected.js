const express = require('express')
const Buyrejected = require('../models/buy_rejected')

const router = new express.Router()



//buyed
router.post('/buyrejected', (req, res) => {
    const buyrejected = new Buyrejected(req.body)

    buyrejected.save().then(() => {
        res.status(201).send(buyrejected)
    }).catch((e) => {
        res.status(400).send(e)
    })
})

//rejected buy

router.get('/rejectbuy', (req,res) => {

    Buyrejected.find ({}).then((buyrejecteds) =>{
        res.status(201).send(buyrejecteds)
    }).catch((e) => {
        res.status(401).json({
            message: "no data"+e
          });
    })
})


//customer buy rejected

router.get('/customer/rejectbuy', (req,res) => {

    const id = req.headers['id']

    Buyrejected.find ({"user_id" : id}).then((buyrejecteds) =>{
        res.status(201).send(buyrejecteds)
    }).catch((e) => {
        res.status(401).json({
            message: "no data"+e
          });
    })
})




module.exports = router



