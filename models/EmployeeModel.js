const mongoose = require('mongoose')

const employeeSchema = mongoose.Schema({
    first_name: {
        type: String,
        required: true,
    },
    last_name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
    },
    gender: {
        type: String,
        enum: {
            values: ['Male', 'Female', 'Other']
        },
        required: true
    },
    salary: {
        type: Number,
        set: function (v) { return Math.round(v) },
        required: true
    }
})

module.exports = mongoose.model('Employee', employeeSchema)