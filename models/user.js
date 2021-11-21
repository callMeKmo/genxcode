// npm modules.

import { Schema, model } from 'mongoose'

// create schema and proprties.

const newSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    arTitle: {
        type: String,
        required: true
    },
    arDescription: {
        type: String
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now,
    }
})
// export the module

export default model('user', newSchema)