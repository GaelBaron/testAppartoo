require("dotenv").config()
require("./db/db").connect()
const express = require("express")
const cors = require('cors')
const register = require('./routes/register')
const login = require('./routes/login')
const role = require('./routes/role')
const friends = require('./routes/friends')
const app = express()

app.use(express.json())
app.use(cors())

app.use('/api', register)
app.use('/api', login)
app.use('/api', role)
app.use('/api', friends)

module.exports = app
