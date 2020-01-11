const express = require('express')
const Sellrejected = require('../models/sell_rejected')
const { MongoClient, ObjectID } = require('mongodb')
const connectionURL = 'mongodb://localhost:27017/neera'
const databaseName = 'neera-api'

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

router.get('/rejectsell', (req, res) => {

    MongoClient.connect(connectionURL, { useNewUrlParser: true }, (error, client) => {
        if (error) {
            return console.log('Unable to connect to database!')
        }

        const db = client.db(databaseName)

        db.collection('sellrejecteds').find({}).toArray((error, sellrejecteds) => {
            res.status(201).send(sellrejecteds)
        })
    })
})

//customer sell rejections

router.get('/customer/rejectsell', (req, res) => {

    MongoClient.connect(connectionURL, { useNewUrlParser: true }, (error, client) => {
        if (error) {
            return console.log('Unable to connect to database!')
        }

        const db = client.db(databaseName)
        const id = req.headers['id']
        db.collection('sellrejecteds').find({"user_id" : id}).toArray((error, sellrejecteds) => {
            res.status(201).send(sellrejecteds)
        })
    })
})


module.exports = router



