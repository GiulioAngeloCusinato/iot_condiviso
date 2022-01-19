
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const routes = require('./drone.router');
const errorHandlers = require('./errors');

mongoose.connect('mongodb://localhost:27017/droneProva1', { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.set('debug', true);

app.listen(8011, () => console.log('app listening on port: 8011'));

app.use(express.json());

app.use('/drone', routes);

app.use(errorHandlers);

module.exports = app;

// main