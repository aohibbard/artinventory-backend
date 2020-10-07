const mongoose = require('mongoose');
const Joi = require('joi');

const artistSchema = new mongoose.Schema({
    name: { 
        type: String,
        required: true,
        minLength: 3,
        maxLength: 255
    },
    dateAdded: { type: Date, default: Date.now },
    lastUpdated: { type: Date, default: Date.now },
});

const Artist = mongoose.model('Artist', artistSchema);

function validateArtist(artist){
    const schema = Joi.object({
        name: Joi.string().min(3).required(),
        dateAdded: Joi.date(),
        lastUpdated: Joi.date()
    })
    return schema.validate(artist)
}

exports.artistSchema = artistSchema;
exports.Artist = Artist;
exports.validateArtist = validateArtist;