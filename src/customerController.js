const { publishToQueue } = require('./pubsub'); 

const validateCustomer = (data) => {
    // Add validation logic
    return true;
};

const addCustomer = (req, res) => {
    const customer = req.body;
    if (validateCustomer(customer)) {
        publishToQueue('customerQueue', customer);
        res.status(200).send({ message: 'Customer data sent to queue' });
    } else {
        res.status(400).send({ message: 'Invalid customer data' });
    }
};

module.exports = { addCustomer }; 
