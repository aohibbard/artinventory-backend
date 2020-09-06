const express = require('express');
const router = express.Router();
const mongoose = require('mongoose')

const {Artist, validate} = require('../models/artist')

// index
router.get('/', async(req, res) => {
    const artists = await Artist.find().sort('name');
    res.send(artists);
});

// post
router.post('/', async(req, res) => {
    const {error} = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message)

    let artist = new Artist({
        artist: req.body.name,
        dateAdded: req.body.dateAdded,
        lastUpdated: req.body.lastUpdated
    });
    artist = await artist.save();
    res.send(artist)
});

// get
router.get('/:id', async (req, res) => {
    const artist = await Artist.findById(req.params.id);
    if (!artist) return res.status(404).send('The artist with that ID was not found');
    res.send(artist);
})

// put 
router.put('/:id', async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const artist = await Artist.findById(req.params.id, {name: req.body.name, lastUpdated: Date.now()}, {
        new: true
    })
    if (!artist) return res.status(404).send('The artist with that ID was not found');
    res.send(artist)
});

router.delete(':/id', async (req, res) => {
    const artist = await Artist.findByIdAndRemove(req.params.id);
    if (!artist) return res.status(404).send('The artist with that ID was not found');
    res.send(artist)
})