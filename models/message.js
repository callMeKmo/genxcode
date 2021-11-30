// npm modules.

const mongoose = require('mongoose')

// create schema and proprties.

const newSchema = new mongoose.Schema({
    from: {
        type: String,
        required: true
    },
    to: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    content: {
        type: String,
        required: true
    }
})
// export the module

module.exports = mongoose.model('message', newSchema)