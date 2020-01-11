const express = require('express')
const Buyed = require('../models/buyed')
const { MongoClient, ObjectID } = require('mongodb')
const connectionURL = 'mongodb://localhost:27017/neera'
const databaseName = 'neera-api'

const router = new express.Router()



//buyed
router.post('/buyed', (req, res) => {
    const buyed = new Buyed(req.body)

    buyed.save().then(() => {
        res.status(201).send(buyed)
    }).catch((e) => {
        res.status(400).send(e)
    })
})

router.get('/acceptbuy', (req, res) => {

  MongoClient.connect(connectionURL, { useNewUrlParser: true }, (error, client) => {
      if (error) {
          return console.log('Unable to connect to database!')
      }

      const db = client.db(databaseName)

      db.collection('buyeds').find({}).toArray((error, buyeds) => {
          res.status(201).send(buyeds)
      })
  })
})

//customer buy accept

router.get('/customer/acceptbuy', (req, res) => {

  MongoClient.connect(connectionURL, { useNewUrlParser: true }, (error, client) => {
      if (error) {
          return console.log('Unable to connect to database!')
      }

      const db = client.db(databaseName)
      const id = req.headers['id']
      db.collection('buyeds').find({"user_id" : id}).toArray((error, buyeds) => {
          res.status(201).send(buyeds)
      })
  })
})



module.exports = router



