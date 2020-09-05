const mongoose = require('mongoose')
const Joi = require('joi')

const Artist = mongoose.model('Artwork', new mongoose.Schema({
    name: { 
        type: String,
        required: true,
        minLength: 3},
    dateAdded: { type: Date, default: Date.now },
    lastUpdated: { type: Date, default: Date.now }
}));

function validateArtist(artist){
    const schema = {
        name: Joi.string.min(3).required(),
        dateAdded: Joi.date(),
        lastUpdated: Joi.date()
    }
    return Joi.validate(artist)
}

exports.Artist = Artist;
exports.validateArtist = validateArtist;