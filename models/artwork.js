const mongoose = require('mongoose')
const Joi = require('joi')

// for artist consider "type: mongoose.Schema.Types.ObjectId"
// see https://bezkoder.com/mongoose-one-to-many-relationship/#Model_One-to-Many_Relationships_in_MongoDB

const artworkSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        minLength: 2,
        maxLength: 300
    },
    year: { type: Number, required: true },
    medium: {type: String, required: false, default: null},
    dimensions: {type: String, required: false, default: null},
    price: {type: String, default: null, required: false},
    notes: {type: String, default: null, required: false},
    editionNo: {type: Number, default: null, required: false},
    editionSize: {type: Number, default: null, required: false},
    tags: [ String ],
    dateAdded: { type: Date, default: Date.now },
    lastUpdated: { type: Date, default: Date.now }
})


const Artwork = mongoose.model('Artwork', artworkSchema);

function validateArtwork(artwork){
    // artistId: Joi.string().required(),
    const schema = Joi.object({
        title: Joi.string().min(2).max(300).required(),
        year: Joi.number().required(),
        medium: Joi.string(),
        dimensions: Joi.string(),
        editionNo: Joi.number(),
        editionSize: Joi.number(),
        tags: Joi.array().items({ a: Joi.string() })
    })
    return schema.validate(artwork)
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
exports.artworkSchema = artworkSchema;