// npm modules.

const mongoose = require('mongoose')

// create schema and proprties.

const newSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    basekey: {
        type: String,
        required: true
    },
    recoveryEmail: {
        type: String,
        required: true
    },
    passkey: {
        type: String,
        required: true,
        default: null
    },
    type: {
        type: String,
        required: true,
        default: 'user'
    },
    interest: {
        type: Array,
    }
})
// export the module

module.exports = mongoose.model('User', newSchema)