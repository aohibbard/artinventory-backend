const mongoose = require('mongoose');
const Joi = require('joi');
const { validateArtwork, artworkSchema } = require('./artwork')

const artistSchema = new mongoose.Schema({
    name: { 
        type: String,
        required: true,
        minLength: 3,
        maxLength: 255
    },
    artworks: {
        type: artworkSchema,
        required: false,
        ref: "artwork"
    },
    dateAdded: { type: Date, default: Date.now },
    lastUpdated: { type: Date, default: Date.now },
});

const Artist = mongoose.model('Artist', artistSchema);

function validateArtist(artist){
    const schema = Joi.object({
        name: Joi.string().min(3).required(),
        artworks: Joi.any(),
        dateAdded: Joi.date(),
        lastUpdated: Joi.date()
    })
    return schema.validate(artist)
}

exports.artistSchema = artistSchema;
exports.Artist = Artist;
exports.validateArtist = validateArtist;

/*
artworks: {
    title: "Vanishing Act",
    year: 1997,
    medium: "Etching and aquatint with chine collé",
    dimensions: "plate: 11 7/8 x 8 7/8",
}
*/