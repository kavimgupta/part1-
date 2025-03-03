const amqp = require('amqplib/callback_api');

const publishToQueue = (queueName, data) => {
    amqp.connect('amqp://localhost', (error0, connection) => {
        if (error0) {
            throw error0;
        }
        connection.createChannel((error1, channel) => {
            if (error1) {
                throw error1;
            }
            channel.assertQueue(queueName, {
                durable: false
            });
            channel.sendToQueue(queueName, Buffer.from(JSON.stringify(data)));
            console.log(" [x] Sent %s", data);
        });
    });
};

module.exports = { publishToQueue };
