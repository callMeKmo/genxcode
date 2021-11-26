const mongoose = require('mongoose')

const newSchema = new mongoose.Schema({
    file: {
        type: Buffer,
        required: true
    },
    fileType: {
        type: String,
        required: true
    },
    owner: {
        type: String,
        required: true,
    },
    order: {
        type: Number,
        required: true
    }
})

// create base64 stored images.

newSchema.virtual('filePath').get(function() {
    if (this.file != null && this.fileType != null) {
        return `data:${this.fileType};charset=utf-8;base64,${this.file.toString('base64')}`
    }
})

module.exports = mongoose.model('File', newSchema)