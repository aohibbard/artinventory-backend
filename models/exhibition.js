const mongoose = require('mongoose')
const Joi = require('joi')

const Exhibition = mongoose.model('Exhibition', new mongoose.Schema({
    // artwork should be an export of artwork schema. have to revise that model
    name: {
        type: String,
        required: true,
        minLength: 5,
        maxLength: 200
    },
    startDate: {type: Date, required: true},
    endDate: { type: Date, required: true},
    location: { type: String, required: true},
    city: {type: String},
    artwork: {},
    dateAdded: { type: Date, default: Date.now },
    lastUpdated: { type: Date, default: Date.now }

}))