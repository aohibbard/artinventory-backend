const mongoose = require('mongoose')

// give name
mongoose.connect('mongodb://localhost/artworks')
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.log('Could not connect to MongoDB', err));

const artworkSchema = new mongoose.Schema({
    artist: { type: String, required: true},
    title: { type: String, required: true },
    year: { type: Number, required: true },
    medium: String,
    price: Number,
    notes: String,
    tags: [ String ],
    dateAdded: { type: Date, default: Date.now },
    lastUpdated: { type: Date, default: Date.now }
});

async function createArtwork(){
    const Artwork = mongoose.model('Artwork', artworkSchema);
    const artwork = new Artwork();

    const result = await artwork.save();

}