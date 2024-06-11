const { publishToQueue } = require('./pubsub'); 

const validateOrder = (data) => {
    // Add validation logic
    return true;
};

const addOrder = (req, res) => {
    const order = req.body;
    if (validateOrder(order)) {
        publishToQueue('orderQueue', order);
        res.status(200).send({ message: 'Order data sent to queue' });
    } else {
        res.status(400).send({ message: 'Invalid order data' });
    }
};

module.exports = { addOrder }; 
