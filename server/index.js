
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


var amqp = require('amqplib/callback_api');
const droneSchema = require('./drone.schema');

amqp.connect('amqps://grjftmgx:klgkFLrbazS3xiTNk6hYuqOJbXt5OViX@rat.rmq2.cloudamqp.com/grjftmgx', function(error0, connection) {
    if (error0) {
        throw error0;
    }
    connection.createChannel(function(error1, channel) {
        if (error1) {
            throw error1;
        }

        var queue = 'BrucoGianluco';

        channel.assertQueue(queue, {
            durable: true
        });

        console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", queue);

        channel.consume(queue, function(msg) {
            console.log(" [x] Received %s", msg.content.toString());
            logModel.create(JSON.parse(msg.content))
        }, {
            noAck: true
        });
    });
});