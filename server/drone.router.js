const express = require('express');
const router = express.Router();
const logController = require('./drone.controller');

//definizione dele api relative ai todo
router.post('/', logController.create);
router.post('/:id', logController.createID);
router.get('/', logController.find);
router.get('/lastLog', logController.lastLog);

module.exports = router;