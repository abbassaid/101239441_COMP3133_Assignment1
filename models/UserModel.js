const mongoose = require('mongoose')

const userSchema = mongoose.Schema({

    username: {
        type: String,
        required: true,
        primaryKey: true,
        unique: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true
    }

})

module.exports = mongoose.model('User', userSchema)