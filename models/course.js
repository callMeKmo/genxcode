// npm modules.

const mongoose = require('mongoose')

// create schema and proprties.

const newSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    subject: {
        type: String,
        required: true
    },
    description: {
        type: Number,
        required: true,
        default: 0
    },
    rate: {
        type: Number,
        default: 0
    },
    author: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    videoList:{
        type: Array,
        required: true
    },
    duration:{
        type: Number,
        required: true
    }
})
// export the module

module.exports = mongoose.model('Course', newSchema)