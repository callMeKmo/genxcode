const mongoose = require('mongoose')

const newSchema = new mongoose.Schema({
    list: {
        type: Array,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    owner: {
        type: String,
        required: true,
    }
})

module.exports = mongoose.model('Library', newSchema)