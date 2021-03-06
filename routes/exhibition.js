const express = require('express');
const mongoose = require('mongoose');
const Fawn = require('Fawn')
const { Exhibition, validate } = require('../models/exhibition');
const { Artwork } = require('../models/artwork');
const router = express.Router();

Fawn.init(mongoose);

// INDEX
router.get('/', async (req, res) => {
    const exhibitions = await Exhibition.find.sort('lastUpdated');
    res.send(exhibitions);
});

// GET
router.get('/:id', async(req, res) => {
    const exhibition = await Exhibition.findById(req.params.id);
    if (!exhibition) return res.status(404).send('Exhibition does not exist');
    res.send(exhibition)
})

// POST
router.post('/', async (req, res) => {
    const {error} = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let exhibition = new Exhibition({
        name: req.body.name,
        startDate: req.body.startDate,
        endDate: req.body.endDate,
        venue: req.body.venue,
        city: req.body.city,
        dateAdded: Date(),
        dateUpdated: Date()
    })
    exhibition = await exhibition.save();
    res.send(exhibition);
})

// PUT
router.put('/:id', async (res, req) => {
    const {error} = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const exhibition = await Exhibition.findByIdAndUpdate(req.params.id, {
        name: req.body.name,
        startDate: req.body.startDate,
        endDate: req.body.endDate,
        venue: req.body.venue,
        city: req.body.city,
        dateAdded: req.body.dateAdded,
        dateUpdated: Date()
    },
    {new: true}
    );
    if (!exhibition) return res.status(404).send("Exhibition does not exist");
    if (error) return res.status(400).send(error.details[0].message);

    res.send(exhibition);
})

// DELETE
router.delete('/:id', async (req, res) => {
    const exhibition = await Artwork.findByIdAndRemove(req.params.id);
    if(!exhibition) res.status(404).send("Exhibition does not exist");
    res.send(exhibition);
})

module.exports = router;