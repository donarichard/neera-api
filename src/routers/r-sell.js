const express = require('express')
const Sell = require('../models/sell')
const { MongoClient, ObjectID } = require('mongodb')
const connectionURL = 'mongodb://localhost:27017/neera'
const databaseName = 'neera-api'

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

router.get('/requestsell', (req, res) => {

    MongoClient.connect(connectionURL, { useNewUrlParser: true }, (error, client) => {
        if (error) {
            return console.log('Unable to connect to database!')
        }

        const db = client.db(databaseName)

        db.collection('sells').find({}).toArray((error, sells) => {
            res.status(201).send(sells)
        })
    })
})

//customer sell

router.get('/customer/requestsell', (req, res) => {

    MongoClient.connect(connectionURL, { useNewUrlParser: true }, (error, client) => {
        if (error) {
            return console.log('Unable to connect to database!')
        }

        const db = client.db(databaseName)
        const id = req.headers['id']
        db.collection('sells').find({"user_id" : id}).toArray((error, sells) => {
            res.status(201).send(sells)
        })
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



