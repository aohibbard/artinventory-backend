const Joi = require('joi')
const express = resquire('express')
const app = express()
app.use(express.json())

const port = process.env.PORT || 5000;
app.list(port, () => console.log(`Listening on port ${port}`))