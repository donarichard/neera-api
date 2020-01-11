const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt= require('bcrypt')
const jwt = require('jsonwebtoken')

const tempuserSchema = new mongoose.Schema({
        name: {
            type: String,
            required: true,
            unique:true,
            trim: true
        },
        phone: {
            type: Number,
            unique:true,
            required: true,
            trim: true,
            lowercase: true,   
        },
        email: {
            type: String,
           
        },
        password: {
            type: String,
            required: true,
            minlength: 7,
            trim: true,
            validate(value) {
                if (value.toLowerCase().includes('password')) {
                    throw new Error('Password cannot contain "password"')
                }
            }
        },
        type: {
            type: String,   
        }
    })


  




const Tempuser = mongoose.model('Tempuser', tempuserSchema )




module.exports = Tempuser