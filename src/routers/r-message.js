const express = require('express')
const Message = require('../models/message')

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

router.get('/messages', (req,res) => {
    Message.find ({}).then((messages) =>{
        res.status(201).send(messages)
    }).catch((e) => {
        res.status(401).json({
            message: "no data"+e
          });
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



