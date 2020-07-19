const helmet = require('helmet')
const morgan = require('morgan')
const Joi = require('joi')
const express = resquire('express')
const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(helmet())

if (app.get('env') === 'development'){
    app.use(morgan('tiny'))
    console.log('Using Morgan')
}

const port = process.env.PORT || 5000;
app.list(port, () => console.log(`Listening on port ${port}`))