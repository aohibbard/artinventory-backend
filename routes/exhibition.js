const express = require('express');
const mongoose = require('mongoose');
const Fawn = require('Fawn')
const { Exhibition, validate } = require('../models/exhibition');
const router = express.Router();

Fawn.init(mongoose);

// INDEX
router.get('/', async (req, res) => {
    const exhibition = await Exhibition.find.sort('lastUpdated');
    res.send(exhibitions);
});


module.exports = router;