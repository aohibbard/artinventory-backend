const mongoose = require('mongoose')
const Joi = require('joi')

const Artwork = mongoose.model('Artwork', new mongoose.Schema({
    name: { 
        type: String,
        required: true,
        minLength: 3},
    dateAdded: { type: Date, default: Date.now },
    lastUpdated: { type: Date, default: Date.now }
}));

function validateArtwork(artist){
    const schema = {
        name: Joi.string.min(3).required(),
        dateAdded: Joi.date(),
        lastUpdated: Joi.date()
    }
    return Joi.validate(artist)
}