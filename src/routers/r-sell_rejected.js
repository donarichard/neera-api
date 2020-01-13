const express = require('express')
const Sellrejected = require('../models/sell_rejected')

const router = new express.Router()



//sell
router.post('/sellrejected', (req, res) => {
    const sellrejected = new Sellrejected(req.body)

    sellrejected.save().then(() => {
      return  res.status(201).send(sellrejected)
    }).catch((e) => {
      return res.status(400).send('error')
    })
})

//rejected sells

router.get('/rejectsell', (req,res) => {
    Sellrejected.find ({}).then((sellrejecteds) =>{
        res.status(201).send(sellrejecteds)
    }).catch((e) => {
        res.status(401).json({
            message: "no data"+e
          });
    })
})


//customer sell rejections

router.get('/customer/rejectsell', (req,res) => {

    const id = req.headers['id']

    Sellrejected.find ({"user_id" : id}).then((sellrejecteds) =>{
        res.status(201).send(sellrejecteds)
    }).catch((e) => {
        res.status(401).json({
            message: "no data"+e
          });
    })
})



module.exports = router



