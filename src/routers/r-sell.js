const express = require('express')
const Sell = require('../models/sell')
const router = new express.Router()



//sell
router.post('/sell', (req, res) => {
    const sell = new Sell(req.body)

    sell.save().then(() => {
        res.status(201).send(sell)
    }).catch((e) => {
        res.status(400).send(e)
    })
})

//gettingproducts
router.get('/requestsell', (req,res) => {
    Sell.find ({}).then((sells) =>{
        res.status(201).send(sells)
    }).catch((e) => {
        res.status(401).json({
            message: "no data"+e
          });
    })
})


//customer sell

router.get('/customer/requestsell', (req,res) => {

    const id = req.headers['id']

    Sell.find ({"user_id" : id}).then((sells) =>{
        res.status(201).send(sells)
    }).catch((e) => {
        res.status(401).json({
            message: "no data"+e
          });
    })
})





//remove sell request
router.delete("/removesell/:id", function(req, res) {
    var id = req.params.id;
    Sell.findByIdAndRemove({_id: id}, function(err){
        if(err) {
            //console.log(err);
            return res.status(500).send('failure')
        }
        return res.status(200).send('success remove');
    });
   });

module.exports = router



