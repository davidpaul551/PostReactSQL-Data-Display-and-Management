// routes.js
const express = require('express');
const router = express.Router();
const controller = require('./controller');

router.get('/customers', controller.getCustomers);

module.exports = router;
