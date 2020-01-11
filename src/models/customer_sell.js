const mongoose = require('mongoose')

const customersellSchema = new mongoose.Schema({
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
        time: {
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

const CustomerSell = mongoose.model('CustomerSell', customersellSchema )


module.exports = CustomerSell