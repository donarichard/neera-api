const mongoose = require('mongoose')

const messageSchema = new mongoose.Schema({
        notification: {
            type: String,
            required: true,
            unique: false,
        },
    })
 
const Message = mongoose.model('Message', messageSchema )

module.exports = Message