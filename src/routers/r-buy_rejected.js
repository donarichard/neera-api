const express = require('express')
const Buyrejected = require('../models/buy_rejected')
const { MongoClient, ObjectID } = require('mongodb')
const connectionURL = 'mongodb://localhost:27017/neera'
const databaseName = 'neera-api'

const router = new express.Router()



//buyed
router.post('/buyrejected', (req, res) => {
    const buyrejected = new Buyrejected(req.body)

    buyrejected.save().then(() => {
        res.status(201).send(buyrejected)
    }).catch((e) => {
        res.status(400).send(e)
    })
})

//rejected buy

router.get('/rejectbuy', (req, res) => {

  MongoClient.connect(connectionURL, { useNewUrlParser: true }, (error, client) => {
      if (error) {
          return console.log('Unable to connect to database!')
      }

      const db = client.db(databaseName)

      db.collection('buyrejecteds').find({}).toArray((error, buyrejecteds) => {
          res.status(201).send(buyrejecteds)
      })
  })
})

//customer buy rejected

router.get('/customer/rejectbuy', (req, res) => {

  MongoClient.connect(connectionURL, { useNewUrlParser: true }, (error, client) => {
      if (error) {
          return console.log('Unable to connect to database!')
      }

      const db = client.db(databaseName)
      const id = req.headers['id']
      db.collection('buyrejecteds').find({"user_id" : id}).toArray((error, buyrejecteds) => {
          res.status(201).send(buyrejecteds)
      })
  })
})



module.exports = router



