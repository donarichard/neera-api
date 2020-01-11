const express = require('express')
const Buy = require('../models/buy')
const { MongoClient, ObjectId } = require('mongodb')
const connectionURL = 'mongodb://localhost:27017/neera'
const databaseName = 'neera-api'

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

router.get('/requestbuy', (req, res) => {

    MongoClient.connect(connectionURL, { useNewUrlParser: true }, (error, client) => {
        if (error) {
            return console.log('Unable to connect to database!')
        }

        const db = client.db(databaseName)

        db.collection('buys').find({}).toArray((error, buys) => {
            res.status(201).send(buys)
        })
    })
})

//customer buy

router.get('/customer/requestbuy', (req, res) => {

    MongoClient.connect(connectionURL, { useNewUrlParser: true }, (error, client) => {
        if (error) {
            return console.log('Unable to connect to database!')
        }

        const db = client.db(databaseName)
        const id = req.headers['id']
        db.collection('buys').find({"user_id" : id}).toArray((error, buys) => {
            res.status(201).send(buys)
        })
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



