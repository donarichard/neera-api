const express = require('express')
const User = require('../models/user')

const bcrypt= require('bcrypt')
const jwt = require('jsonwebtoken')

const { MongoClient, ObjectID } = require('mongodb')
const connectionURL = 'mongodb://localhost:27017/neera'
const databaseName = 'neera-api'
const validator = require('validator')
const router = new express.Router()

//users insert

router.post('/users/approved', (req, res) => {


    const user = new User({
      name : req.body.name,
      email : req.body.email,
      phone : req.body.phone,
      password : req.body.password,
      type : req.body.type
    })

    user.save().then(() => {
        res.status(201).send(user)
    }).catch((e) => {
        res.status(400).send(e)
    })
})



//signup



//getting users data as json

router.get('/users', (req, res) => {

    MongoClient.connect(connectionURL, { useNewUrlParser: true }, (error, client) => {
        if (error) {
            return console.log('Unable to connect to database!')
        }

        const db = client.db(databaseName)

        db.collection('users').find({}).toArray((error, users) => {
            res.status(201).send(users)
        })
    })
})

//login

router.post("/login", (req, res, next) => {

    User.find({ phone: req.body.phone })
      .exec()
      .then(user => {
        if (user.length < 1) {
          return res.status(401).json({
            message: "invalid phone / தவறான தொலைபேசி எண் "
          });
        }
        bcrypt.compare(req.body.password, user[0].password, (err, result) => {
          if (err) {
            return res.status(401).json({
              message: "Incorrect Password / தவறான கடவுச்சொல்"
            });
          }
          if (result) {

            const token = jwt.sign({ phone: user[0].phone }, 'phone');

            return res.status(200).json({
              message: "Auth successful",
              token: token,
              type: user[0].type,
              userid: user[0]._id,
              name:user[0].name
            });
          }
          res.status(401).json({
            message: "Incorrect Password / தவறான கடவுச்சொல்"
          });
        });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        });
      });
  });


//hash update
router.patch('/reset/:id', async (req, res) => {
    const updates = Object.keys (req.body)
    const allowedUpdates =[ 'password'] 
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if(!isValidOperation){
        return res.status(400).send({ error:'invalid updates'})
    }

    try{
            
        const user =await User.findById(req.headers.id)
        updates.forEach((update)=> user[update] = req.body[update])

        await user.save()

        if(!user) {
            return res.status(404).send()
        }

        res.send(user)
    } catch(e){
        res.status(400).send(e)
    }
})


module.exports = router



