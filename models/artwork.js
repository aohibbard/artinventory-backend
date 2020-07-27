const mongoose = require('mongoose')
const Joi = require('joi')


const Artwork = mongoose.model('Artwork', new mongoose.Schema({
    artist: { 
        type: String,
        required: true,
        minLength: 3},
    title: {
        type: String,
        required: true,
        minLength: 2 },
    year: { type: Number, required: true },
    medium: String,
    dimensions: String,
    price: Number,
    notes: String,
    tags: [ String ],
    dateAdded: { type: Date, default: Date.now },
    lastUpdated: { type: Date, default: Date.now }
}));

function validateArtwork(artwork){
    const schema = {
        artist: Joi.string.min(3).required(),
        title: Joi.string.min(2).required(),
        year: Joi.number.required(),
        medium: Joi.string(),
        dimensions: Joi.string(),
        tags: Joi.array().items({ a: Joi.string() }),
        dateAdded: Joi.date(),
        lastUpdated: Joi.date()
    }
    return Joi.validate(artwork, schema)
}


exports.Artwork = Artwork;
exports.validate = validateArtwork;