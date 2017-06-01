const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const md5 = require('md5')

const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment]
const database = require('knex')(configuration)

app.use(express.static('public'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.set('port', process.env.PORT || 3001)

app.listen(app.get('port'), () => {
  console.log(`port is running on ${app.get('port')}.`)
})
