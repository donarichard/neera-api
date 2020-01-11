const express = require('express')
const CustomerBuy = require('../models/customerbuy')
const { MongoClient, ObjectID } = require('mongodb')
const connectionURL = 'mongodb://localhost:27017/neera'
const databaseName = 'neera-api'

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

router.get('/customer/requestbuy', (req, res) => {

    MongoClient.connect(connectionURL, { useNewUrlParser: true }, (error, client) => {
        if (error) {
            return console.log('Unable to connect to database!')
        }

        const db = client.db(databaseName)

        db.collection('customerbuys').find({}).toArray((error, customerbuys) => {
            res.status(201).send(customerbuys)
        })
    })
})



module.exports = router



