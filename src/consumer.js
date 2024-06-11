const amqp = require('amqplib/callback_api');
const mongoose = require('mongoose');
const Customer = require('./customerModel');
const Order = require('./orderModel');

mongoose.connect('mongodb://localhost:27017/crm', { useNewUrlParser: true, useUnifiedTopology: true });

amqp.connect('amqp://localhost', (error0, connection) => {
    if (error0) {
        throw error0;
    }
    connection.createChannel((error1, channel) => {
        if (error1) {
            throw error1;
        }

        const consumeQueue = (queueName, Model) => {
            channel.assertQueue(queueName, {
                durable: false
            });

            console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", queueName);
            channel.consume(queueName, async (msg) => {
                console.log(" [x] Received %s", msg.content.toString());
                const data = JSON.parse(msg.content.toString());
                try {
                    const modelInstance = new Model(data);
                    await modelInstance.save();
                    console.log("Data saved to MongoDB");
                } catch (error) {
                    console.error("Error saving data to MongoDB", error);
                }
            }, {
                noAck: true
            });
        };

        consumeQueue('customerQueue', Customer);
        consumeQueue('orderQueue', Order);
    });
});
