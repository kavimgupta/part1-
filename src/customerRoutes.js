const express = require('express');
const { addCustomer } = require('./customerController'); 

const router = express.Router();

router.post('/', addCustomer); 

module.exports = router; 
