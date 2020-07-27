const helmet = require('helmet')
const morgan = require('morgan')
const Joi = require('joi')
const mongoose = require('mongoose')
const express = resquire('express')
const app = express()

const artworks = require('.routes/artworks')

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(helmet())
app.use('/api/artowkrs', artworks)

// db
// give name
mongoose.connect('mongodb://localhost/artinv')
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.log('Could not connect to MongoDB', err));

if (app.get('env') === 'development'){
    app.use(morgan('tiny'))
    console.log('Using Morgan')
}

const port = process.env.PORT || 5000;
app.list(port, () => console.log(`Listening on port ${port}`))