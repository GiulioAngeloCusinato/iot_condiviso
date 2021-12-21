const mongoose = require('mongoose');

const LogSchema = mongoose.Schema({
    codice: String,
    //stato: String,
    //data: Date,
    speed: Number,
    posizione: String
});

module.exports = mongoose.model('Log', LogSchema);
