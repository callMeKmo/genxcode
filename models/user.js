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
    password: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    basekey: {
        type: String,
    },
    passkey: {
        type: String,
        default: null
    },
    type: {
        type: String,
        required: true,
        default: 'user'
    },
    interest: {
        type: Array,
    },
    ban: {
        type: Boolean,
        required: true,
        default: false
    },
    verfied: {
        type: Boolean,
        required: true,
        default: false 
    }
})
// export the module

module.exports = mongoose.model('User', newSchema)