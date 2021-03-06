const mongoose = require('mongoose')
const Joi = require('joi')
const { validateArtwork, artworkSchema } = require('./artwork')

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
    venue: { type: String, required: true},
    city: {type: String},
    artwork: {
        type: artworkSchema,
        ref: 'Artwork',
        require: false
    },
    dateAdded: { type: Date, default: Date.now },
    lastUpdated: { type: Date, default: Date.now }

}))

// add artwork
function validateExhibition(exhibition){
    const schema = {
        name: Joi.string.min(5).max(200).required(),
        startDate: Joi.date.required(),
        endDate: Joi.date.required(),
        venue: Joi.string.required(),
        city: Joi.string()
    }
    return Joi.validate(exhibition, schema)
}

exports.Exhibition = Exhibition;
exports.valdiate = validateExhibition;