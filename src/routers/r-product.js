const express = require('express')
const Product = require('../models/product')

const router = new express.Router()



//upload quantity and price
router.post('/product', (req, res) => {
    const product = new Product(req.body)

    product.save().then(() => {
        res.status(201).send(product)
    }).catch((e) => {
        res.status(400).send(e)
    })
})

//getting quantity and price

router.get('/products', (req,res) => {
    Product.find ({}).then((products) =>{
        res.status(201).send(products)
    }).catch((e) => {
        res.status(401).json({
            message: "no data"+e
          });
    })
})



//update price and quantity

router.patch('/product/:id', async (req, res) => {
    const updates = Object.keys (req.body)
    const allowedUpdates =[ 'buyingprice', 'sellingprice','quantity'] 
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if(!isValidOperation){
        return res.status(400).send({ error:'invalid updates'})
    }

    try{
            
        const product =await Product.findById(req.params.id)
        updates.forEach((update)=> product[update] = req.body[update])

        await product.save()

        if(!product) {
            return res.status(404).send()
        }

        res.send(product)
    } catch(e){
        res.status(400).send(e)
    }
})



module.exports = router



