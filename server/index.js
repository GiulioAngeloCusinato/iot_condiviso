
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const routes = require('./drone.router');
const errorHandlers = require('./errors');

const logModel = require('./drone.model');

mongoose.connect('mongodb://localhost:27017/droneProva1', { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.set('debug', true);

app.listen(8011, () => console.log('app listening on port: 8011'));

app.use(express.json());

app.use('/drone', routes);

app.use(errorHandlers);

module.exports = app;

const mqtt = require('mqtt')

const host = 'test.mosquitto.org';
const port = '1883';
const clientId = "b9c88b0362d34c2aaf9782ad48e7b6d1";//`mqtt_${Math.random().toString(16).slice(3)}`

const connectUrl = `mqtt://${host}:${port}`
const client = mqtt.connect(connectUrl, {
  clientId,
  clean: true,
  connectTimeout: 30,
  username: '',
  password: '',
  reconnectPeriod: 1000,
})

const topic = 'iot2021/GiulioAngeloCusinato'
client.on('connect', () => {
  console.log('Connected')
  client.subscribe([topic], () => {
    console.log(`Subscribe to topic '${topic}'`)
})


client.publish(topic, 'nodejs mqtt test', { qos: 0, retain: false }, (error) => {
    if (error) {
      console.error(error)
    }
  })
})

client.on('message', (topic, payload) => {
    console.log('Received Message:', topic, payload.toString())
    logModel.create(payload);
})
