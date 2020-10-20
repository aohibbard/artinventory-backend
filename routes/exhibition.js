const express = require('express');
const mongoose = require('mongoose');
const Fawn = require('Fawn')
const { Exhibition, validate } = require('../models/exhibition');
const router = express.Router();

Fawn.init(mongoose);

// INDEX
router.get('/', async (req, res) => {
    const exhibitions = await Exhibition.find.sort('lastUpdated');
    res.send(exhibitions);
});

router.get('/:id', async(req, res) => {
    const exhibition = await Exhibition.findById(req.params.id);
    if (!exhibition) return res.status(404).send('Exhibition does not exist');
    res.send(exhibition)
})

router.post('/', async (req, res) => {
    const {error} = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let exhibition = new Exhibition({
        name: req.body.name,
        startDate: req.body.startDate,
        endDate: req.body.endDate,
        venue: req.body.venue,
        city: req.body.city,
        dateAdded: req.body.dateAdded,
        dateUpdated: Date()
    })
    exhibition = await exhibition.save();
    res.send(exhibition);
})

module.exports = router;