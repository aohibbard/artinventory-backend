const express = require('express');
const mongoose = require('mongoose');
const Fawn = require('Fawn')
const { Artwork, validate } = require('../models/artwork');
const { Artist } = require('../models/artist')
const router = express.Router();

Fawn.init(mongoose);

// INDEX
router.get('/', async (req, res) => {
    const artworks = await Artwork.find.sort('dateAdded');
    res.send(artworks);
});



// POST
router.post('/', async (req, res) => {
    const {error} = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    // const artist = await Artist.findById(req.body.artistId)
    // if (!artist) res.status(400).send('Invalid artist')

    let artwork = new Artwork({
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
    const {error} = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const artwork = await Artwork.findByIdAndUpdate(req.params.id, {
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

    try {
        new Fawn.Task()
            .save('artworks', artwork) // case sensitive, pass actual name of collection
            .update('artist', {_id: artist.id}, {
                //  $inc: {numberInStock: -1}
            })
        .run(); // need to call run 
    }
    catch(ex) {
        res.status(500).send('Something went wrong')
    }

    res.send(artwork)
})

// GET
// needs id?
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