const mongoose = require('mongoose')

const selledSchema = new mongoose.Schema({
    user_id: {
        type: String,
        required: true,
        unique: false,
    },
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
        price: {
            type: String,
            required: true,
            unique: false,
        }           

    })

  




const Selled = mongoose.model('Selled', selledSchema )




module.exports = Selled