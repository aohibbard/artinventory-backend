const mongoose = require('mongoose');
const Joi = require('joi');

const artistSchema = new mongoose.Schema({
    name: { 
        type: String,
        required: true,
        minLength: 3
    },
    dateAdded: { type: Date, default: Date.now },
    lastUpdated: { type: Date, default: Date.now },
});

const Artist = mongoose.model('Artist', artistSchema);

function validateArtist(artist){
    const schema = {
        name: Joi.string.min(3).required(),
        dateAdded: Joi.date(),
        lastUpdated: Joi.date()
    }
    return Joi.validate(artist, schema)
}

exports.artistSchema = artistSchema;
exports.Artist = Artist;
exports.validateArtist = validateArtist;