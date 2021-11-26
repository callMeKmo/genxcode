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
    publishDate:{
        type: Date,
        required: true
    },
    publishPlace:{
        type: String,
        required: true
    },
    itbn:{
        type: String,
        required: true
    },
    issue:{
        type: String,
        required: true
    },
    chapterList:{
        type: Array,
        required: true
    },
    pages:{
        type: Number,
        required: true
    }
})
// export the module

export default model('Book', newSchema)