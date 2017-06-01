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

app.get('/', (request, response) => {
  fs.readFile(`${__dirname}/index.html`, (err, file) => {
    response.send(file)
  })
})

app.get('/api/v1/model', (request, response) => {
  database('model').select()
    .then(model => {
      response.status(200).json(model)
    })
    .catch(error => {
      console.error('error: ', error)
    });
})

app.get('/api/v1/model/:id', (request, response) => {
  database('model').where('id', request.params.id).select()
    .then(model => {
      response.status(200).json(model)
    })
    .catch(error => {
      console.error('error: ', error)
    });
})
