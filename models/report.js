// npm modules.

const mongoose = require('mongoose')

// create schema and proprties.

const newSchema = new mongoose.Schema({
    card: {
        type: String,
        required: true
    },
    action: {
        type: String,
        required: true
    },
    from: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
})
// export the module

module.exports = mongoose.model('Report', newSchema)