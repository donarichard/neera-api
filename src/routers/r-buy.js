const express = require('express')
const Buy = require('../models/buy')

const router = new express.Router()



//buy
router.post('/buy', (req, res) => {
    const buy = new Buy(req.body)

    buy.save().then(() => {
        res.status(201).send(buy)
    }).catch((e) => {
        res.status(400).send(e)
    })
})

//buy request
router.get('/requestbuy', (req,res) => {
    Buy.find ({}).then((buys) =>{
        res.status(201).send(buys)
    }).catch((e) => {
        res.status(401).json({
            message: "no data"+e
          });
    })
})


//customer buy request


router.get('/customer/requestbuy', (req,res) => {

    const id = req.headers['id']

    Buy.find ({"user_id" : id}).then((buys) =>{
        res.status(201).send(buys)
    }).catch((e) => {
        res.status(401).json({
            message: "no data"+e
          });
    })
})

// remove data

router.delete("/removebuy/:id", function(req, res) {
   var id = req.params.id;
   Buy.findByIdAndRemove({_id: id}, function(err){
       if(err) {
           //console.log(err);
           return res.status(500).send('failure')
       }
       return res.status(200)
   });
  });



module.exports = router



