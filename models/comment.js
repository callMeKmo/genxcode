// npm modules.

const mongoose = require('mongoose')

// create schema and proprties.

const newSchema = new mongoose.Schema({
    from: {
        type: String,
        required: true
    },
    owner: {
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
    },
    subOwner: {
        type: String,
        required: true
    },
    isSub: {
        type: Boolean,
        required: true
    }
})
// export the module

module.exports = mongoose.model('Comment', newSchema)