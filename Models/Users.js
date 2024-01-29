const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    name: String,
    password: {
        type: String
    },
    role: {
        type: String,
        default: 'user'
    },
    active: {
        type: Boolean,
        default: true
    }
}, { timestamps: true })

module.exports = mongoose.model('users', userSchema)