const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
        buyingprice: {
            type: Number,
            required: true,
            unique: false,
        },
        sellingprice: {
            type: Number,
            required: true,
            unique: false,
        },
        quantity: {
            type: Number,
            required: true,
            unique: false,
        }, 
        about:{
            type:String,
        },
        about_tamil:{
            type:String,
        },
    })

  




const Product = mongoose.model('Product', productSchema )




module.exports = Product