// npm modules.

const mongoose = require('mongoose')

// create schema and proprties.

const newSchema = new mongoose.Schema({
    dakey: {
        type: String,
        required: true
    },
    crkey: {
        type: String,
        required: true
    },
    ivkey: {
        type: String,
        required: true
    }
})
// export the module

module.exports = mongoose.model('Key', newSchema)