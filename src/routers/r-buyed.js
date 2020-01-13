const express = require('express')
const Buyed = require('../models/buyed')

const router = new express.Router()



//buyed
router.post('/buyed', (req, res) => {
    const buyed = new Buyed(req.body)

    buyed.save().then(() => {
        res.status(201).send(buyed)
    }).catch((e) => {
        res.status(400).send(e)
    })
})


//accept buy

router.get('/acceptbuy', (req,res) => {
    Buyed.find ({}).then((buyeds) =>{
        res.status(201).send(buyeds)
    }).catch((e) => {
        res.status(401).json({
            message: "no data"+e
          });
    })
})


//customer buy accept

router.get('/customer/acceptbuy', (req,res) => {

    const id = req.headers['id']

    Buyed.find ({"user_id" : id}).then((buyeds) =>{
        res.status(201).send(buyeds)
    }).catch((e) => {
        res.status(401).json({
            message: "no data"+e
          });
    })
})



module.exports = router



