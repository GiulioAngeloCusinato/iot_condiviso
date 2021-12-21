const logModel = require('./drone.model');

module.exports.createID = async (req, res, next) => {
    try {
        console.log(req.body);
        const newBody = {
            codice: req.params['id'],
            //stato: String,
            //data: Date,
            speed:  req.body.speed,
            posizione: req.body.posizione
            };
        const created = await logModel.create(newBody);
        res.status(201);
        res.json(created);
    }catch(err) {
        next(err);
    }
}

module.exports.create = async (req, res, next) => {
    try {
        const created = await logModel.create(req.body);
        res.status(201);
        res.json(created);
    }catch(err) {
        next(err);
    }
}

module.exports.find = async (req, res, next) => {
    try {
        const list = await logModel.find(req.query);
        res.json(list);
    }catch(err) {
        next(err);
    }
}


module.exports.lastLog = async (req, res, next) => {
    try {
        const list = await logModel.lastLog(req.query);
        res.json(list);
    }catch(err) {
        next(err);
    }
}