const Log = require('./drone.schema');

module.exports.create = async (data) => {
    return Log.create(data);
}

module.exports.find = async (query) => {
    const q = {};
    if (query.stato) {
        q.stato = query.stato;
    }
    if (query.from || query.to) {
        q.data = {};
    }
    if (query.from) {
        q.data.$gte = query.from;
    }
    if (query.to) {
        q.data.$lte = query.to;
    }
    return Log.find(q).sort({data: -1});
}

module.exports.lastLog = async(from, to) => {
    const q = {
        data: {
            $gte: from,
            $lte: to
        }
    };

    return Log.findOne(q).sort({data: -1});
}

/*
module.exports.getAllCodice = async() => {
    return Log.find().distinct('codice');
}

module.exports.existsByCode = async(code) => {
    const record = await Log.findOne({codice: code})
    return !!record;
}
*/