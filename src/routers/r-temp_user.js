const express = require('express')
const Tempuser = require('../models/temp_user')

const bcrypt= require('bcrypt')
const jwt = require('jsonwebtoken')

// const  MongoClient  = require('mongodb')
// const connectionURL = 'mongodb://localhost:27017/neera'
const databaseName = 'neera-api'
const validator = require('validator')


const router = new express.Router()

//users insert

router.post('/register', async(req, res) => {

    var hashpassword = await bcrypt.hash(req.body.password, 8)

    const tempuser = new Tempuser({
      name : req.body.name,
      email : req.body.email,
      phone : req.body.phone,
      password : hashpassword,
      type : req.body.type
    })

    tempuser.save().then(() => {
        res.status(201).send(tempuser)
    }).catch((e) => {
        res.status(401).json({
            message: "enter correct details"+e
          });
    })
})

//signup



//getting users data as json

router.get('/tempuser', (req,res) => {
    Tempuser.find ({}).then((tempusers) =>{
        res.status(201).send(tempusers)
    }).catch((e) => {
        res.status(401).json({
            message: "no data"+e
          });
    })
})

// router.get('/tempusers', (req, res) => {

//     MongoClient.connect(connectionURL, { useNewUrlParser: true }, (error, client) => {
//         if (error) {
//             return console.log('Unable to connect to database!')
//         }

//         const db = client.db(databaseName)

//         db.collection('tempusers').find({}).toArray((error, tempusers) => {
//             res.status(201).send(tempusers)
//         })
//     })
// })

router.delete("/remove/tempuser/:id", function(req, res) {
    var id = req.params.id;
    Tempuser.findByIdAndRemove({_id: id}, function(err){
        if(err) {
            //console.log(err);
            return res.status(500).send('failure')
        }
        return res.status(200).send('success remove');
    });
   });



module.exports = router



