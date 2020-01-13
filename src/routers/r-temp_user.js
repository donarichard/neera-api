const express = require('express')
const Tempuser = require('../models/temp_user')

const bcrypt= require('bcrypt')


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



