const express = require('express')
const CustomerSell = require('../models/customersell')
const { MongoClient, ObjectID } = require('mongodb')
const connectionURL = 'mongodb://localhost:27017/neera'
const databaseName = 'neera-api'

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

//gettingproducts

router.get('/customer/requestsell', (req, res) => {

    MongoClient.connect(connectionURL, { useNewUrlParser: true }, (error, client) => {
        if (error) {
            return console.log('Unable to connect to database!')
        }

        const db = client.db(databaseName)

        db.collection('customersells').find({}).toArray((error, customersells) => {
            res.status(201).send(customersells)
        })
    })
})



module.exports = router



