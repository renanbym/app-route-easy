const credentials = require('./config/config')[process.env.NODE_ENV]
const express = require('express')
const cors = require('cors')
const load = require('express-load')
const bodyParser = require('body-parser')
const http = require('http')
const mongoose = require('mongoose')

const db = mongoose.connect( credentials.db_host, {
    useMongoClient: true
})
db.on('connected', function () {
    console.log('Mongoose default connection', credentials.db_host)
})
db.on('error', function (err) {
    console.log('Mongoose default connection error: ' + err)
})

const app = express()
const server = http.createServer(app)

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({'extended':'false'}))

// app.use( (req, res, next) => { res.setHeader('Access-Control-Allow-Origin', '*');  next(); } )


load('models',{cwd: './api/app'})
.then('controllers')
.then('routes')
.into( app )


server.listen( credentials.port )
.on('listening', () => {
    console.log('run, forest!', process.env.NODE_ENV, credentials.port)
})

module.exports = app
