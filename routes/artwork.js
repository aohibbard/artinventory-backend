const express = require('express');
const mongoose = require('mongoose');
const { Artwork, validate } = require('../models/artwork');
const { Artist } = require('../models/artist')
const router = express.Router();

// INDEX
router.get('/', async (req, res) => {
    const artworks = await Artwork.find.sort('dateAdded');
    res.send(artworks);
});

// POST
router.post('/', async (req, res) => {
    const artworks = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const artist = await Artist.findById(req.body.artistId)
    if (!artist) res.status(400).send('Invalid artist')

    let artwork = new Artwork({
        artist: {
            _id: artist._id,
            name: artist.name
        },
        title: req.body.title,
        year: req.body.year,
        medium: req.body.medium,
        dimensions: req.body.dimensions,
        tags: req.body.tags,
        dateAdded: req.body.dateAdded,
        dateUpdated: Date()
    }); 
    artwork = await artwork.save();
    res.send(artwork)
})

// PUT
router.put('/:id', async (res, req) => {
    const artworks = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const artist = await Artist.findById(req.body.artistId)
    if (!artist) res.status(400).send('Invalid artist')

    const artwork = await Artwork.findByIdAndUpdate(req.params.id, {
        artist: {
            _id: artist.id,
            name: artist.name
        },
        title: req.body.title,
        year: req.body.year,
        medium: req.body.medium,
        dimensions: req.body.dimensions,
        tags: req.body.tags,
        dateAdded: req.body.dateAdded,
        dateUpdated: Date()
        }, 
        {new: true}
    );
    if (!artwork) return res.status(404).send("Artwork not found")
    if (error) return res.status(400).send(error.details[0].message)
    res.send(artwork)
})

// GET
router.get('/', async (req, res) => {
    const artwork = await Artwork.findById(req.params.id)
    if(!artwork) return res.status(404).send('Artwork does not exist')
    res.send(artwork)
})

// DELETE
router.delete('/:id', async (req, res) => {
    const artwork = await Artwork.findByIdAndRemove(req.params.id);
    if(!artwork) return res.status(404).send("Artwork does not exist");
    res.send(artwork)
})


module.exports = router;