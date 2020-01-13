const express = require('express')
const Selled = require('../models/selled')
const router = new express.Router()



//sell
router.post('/selled', (req, res) => {
    const selled = new Selled(req.body)

    selled.save().then(() => {
      return  res.status(201).send('added post')
    }).catch((e) => {
      return res.status(400).send('error')
    })
})

//gettingproducts

router.get('/acceptsell', (req,res) => {
    Selled.find ({}).then((selleds) =>{
        res.status(201).send(selleds)
    }).catch((e) => {
        res.status(401).json({
            message: "no data"+e
          });
    })
})

//customer sell accept
router.get('/customer/acceptsell', (req,res) => {

    const id = req.headers['id']

    Selled.find ({"user_id" : id}).then((selleds) =>{
        res.status(201).send(selleds)
    }).catch((e) => {
        res.status(401).json({
            message: "no data"+e
          });
    })
})


module.exports = router



