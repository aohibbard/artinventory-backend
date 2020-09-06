const mongoose = require('mongoose')
const Joi = require('joi')
const {artistSchema} = require('./artist')

const Artwork = mongoose.model('Artwork', new mongoose.Schema({
    artist: { 
        type: artistSchema,
        required: true
    },
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
        artistId: Joi.string.required(),
        title: Joi.string.min(2).required(),
        year: Joi.number.required(),
        medium: Joi.string(),
        dimensions: Joi.string(),
        tags: Joi.array().items({ a: Joi.string() })
    }
    return Joi.validate(artwork, schema)
}

// function showArtwork(){
//     const artworks = await Artwork
//         .find()
//         .populate('artist', 'name -_id') //take second argument for limit of author properties while '-_id' removes id 
//         .select('artist title year medium dimensions')
//     return artworks
// }

// async function updateArtist(artworkId, newName){
//     const artwork = await Artwork.update({_id: artworkId}, {
//         $set: {
//             'artist.name': newName
//         }
//     })
// }

exports.Artwork = Artwork;
exports.validate = validateArtwork;