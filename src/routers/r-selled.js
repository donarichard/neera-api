const express = require('express')
const Selled = require('../models/selled')
const { MongoClient, ObjectID } = require('mongodb')
const connectionURL = 'mongodb://localhost:27017/neera'
const databaseName = 'neera-api'

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

router.get('/acceptsell', (req, res) => {

    MongoClient.connect(connectionURL, { useNewUrlParser: true }, (error, client) => {
        if (error) {
            return console.log('Unable to connect to database!')
        }

        const db = client.db(databaseName)

        db.collection('selleds').find({}).toArray((error, selleds) => {
            res.status(201).send(selleds)
        })
    })
})

//customer sell accept

router.get('/customer/acceptsell', (req, res) => {

    MongoClient.connect(connectionURL, { useNewUrlParser: true }, (error, client) => {
        if (error) {
            return console.log('Unable to connect to database!')
        }

        const db = client.db(databaseName)
        const id = req.headers['id']
        db.collection('selleds').find({"user_id" : id}).toArray((error, selleds) => {
            res.status(201).send(selleds)
        })
    })
})


module.exports = router



