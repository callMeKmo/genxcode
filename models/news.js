// npm modules.

const mongoose = require('mongoose')

// create schema and proprties.

const newSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true
    },
    subject: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    title: {
        type: String,
        required: true
    }
})
// export the module

module.exports = mongoose.model('message', newSchema)