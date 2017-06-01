const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();

const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment];
const database = require('knex')(configuration);

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.set('port', process.env.PORT || 3001);

app.listen(app.get('port'), () => {
  console.log(`port is running on ${app.get('port')}.`);
});

app.get('/', (request, response) => {
  fs.readFile(`${__dirname}/index.html`, (err, file) => {
    response.send(file);
  });
});

app.get('/api/v1/model', (request, response) => {
  database('model').select()
    .then((model) => {
      response.status(200).json(model);
    })
    .catch((error) => {
      response.status(404).send(`We cannot find the url you were looking for. ${error}`);
    });
});

app.get('/api/v1/model/:id', (request, response) => {
  database('model').where('id', request.params.id).select()
    .then((model) => {
      if (!model.length) {
        response.status(404).send('we cannot find the model you are looking for');
      } else {
        response.status(200).json(model);
      }
    })
    .catch((error) => {
      response.status(500).send(`${error}`);
    });
});

app.post('/api/v1/model', (request, response) => {
  database('model').insert(request.body)
  .then((model) => {
    response.status(201).json(model);
  })
  .catch((error) => {
    response.status(422).send(`${error}`);
  });
});
