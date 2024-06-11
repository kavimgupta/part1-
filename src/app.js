const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const customerRoutes = require('./customerRoutes'); 
const orderRoutes = require('./orderRoutes'); 

const app = express();

app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/crm', { useNewUrlParser: true, useUnifiedTopology: true });

app.use('/customers', customerRoutes); 
app.use('/orders', orderRoutes); 

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
