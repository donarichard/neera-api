const express = require('express')
const Message = require('../models/message')
const { MongoClient, ObjectID } = require('mongodb')
const connectionURL = 'mongodb://localhost:27017/neera'
const databaseName = 'neera-api'

const router = new express.Router()



//upload message
router.post('/message', (req, res) => {
    const message = new Message(req.body)

    message.save().then(() => {
        res.status(201).send(message)
    }).catch((e) => {
        res.status(400).send(e)
    })
})

//getting messages

router.get('/messages', (req, res) => {

    MongoClient.connect(connectionURL, { useNewUrlParser: true }, (error, client) => {
        if (error) {
            return console.log('Unable to connect to database!')
        }

        const db = client.db(databaseName)

        db.collection('messages').find({}).toArray((error, messages) => {
            res.status(201).send(messages)
        })
    })
})

//update messages

router.patch('/message/:id', async (req, res) => {
    const updates = Object.keys (req.body)
    const allowedUpdates =[ 'notification',] 
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if(!isValidOperation){
        return res.status(400).send({ error:'invalid updates'})
    }

    try{
            
        const message =await Message.findById(req.params.id)
        updates.forEach((update)=> message[update] = req.body[update])

        await message.save()

        if(!message) {
            return res.status(404).send()
        }

        res.send(message)
    } catch(e){
        res.status(400).send(e)
    }
})



module.exports = router



