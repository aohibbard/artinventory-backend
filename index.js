const helmet = require('helmet')
const morgan = require('morgan')
const mongoose = require('mongoose')
const express = require('express')
const app = express()

const artworks = require('./routes/artwork')
const artist = require('./routes/artist')
// const exhibition = require('./routes/exhibition')

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(helmet())
app.use('/api/artworks', artworks)
app.use('/api/artist', artist)

// db
// give name
mongoose.connect('mongodb://localhost/artinv')
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.log('Could not connect to MongoDB', err));

if (app.get('env') === 'development'){
    app.use(morgan('tiny'))
    console.log('Using Morgan')
}

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}`))