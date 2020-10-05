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

app.get('/', (request, response) => {
  fs.readFile(`${__dirname}/index.html`, (err, file) => {
    response.send(file);
  });
});

app.get('/api/v1/model', (request, response) => {
  database('model').select()
    .then((model) => {
      if(!model.length) {
        response.send(`You do not have anything in your garage`)
      } else {
          response.status(200).json(model);
      }
    })
    .catch((error) => {
      response.status(404).send(`${error}`);
    })
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
  const { name, reason, cleanliness } = request.body;
  const garbage = { name, reason, cleanliness }

  database('model').insert(garbage, ['id', 'name', 'cleanliness', 'reason'])
  .then((garbage) => {
    response.status(201).json(garbage[0]);
  })
  .catch((error) => {
    response.status(422).send(`${error}`);
  });
});

app.patch('/api/v1/model/:id', (request, response) => {
  database('model').where('id', request.params.id).update(request.body)
  .then(() => {
    response.status(201).json(request.body)
  })
  .catch(() => {
    response.status(404).send('ID not found or invalid.');
  })
})

app.listen(app.get('port'), () => {f:
  (`port is running on ${app.get('port')}`);
});

module.exports = app;
