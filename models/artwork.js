const mongoose = require('mongoose')

// give name
mongoose.connect('mongodb://localhost/artworks')
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.log('Could not connect to MongoDB', err));

const artworkSchema = new mongoose.Schema({
    artist: String,
    title: String,
    year: Integer,
    medium: String,
    price: Integer,
    ntoes: String,
    tags: [ String ],
    dateAdded: { type: Date, default: Date.now },
    lastUpdated: { type: Date, default: Date.now }
});

async function createArtwork(){
    const Artwork = mongoose.model('Artwork', artworkSchema);
    const artwork = new Artwork();

    const result = await artwork.save();

}