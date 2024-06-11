const express = require('express');
const { addOrder } = require('./orderController'); 

const router = express.Router();

router.post('/', addOrder); 

module.exports = router; 
