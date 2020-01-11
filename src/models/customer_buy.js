const mongoose = require('mongoose')

const customerbuySchema = new mongoose.Schema({
        name: {
            type: String,
            required: true,
            unique: false,
        },
        phone: {
            type: String,
            required: true,
            unique: false,
        }, 
        quantity: {
            type: String,
            required: true,
            unique: false,
        },   
        date: {
            type: String,
            required: true,
            unique: false,
        },   
        location: {
            type: String,
            required: true,
            unique: false,
        },          

    })

  




const CustomerBuy = mongoose.model('CustomerBuy', customerbuySchema )




module.exports = CustomerBuy