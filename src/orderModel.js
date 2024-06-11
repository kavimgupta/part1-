const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    customerId: mongoose.Schema.Types.ObjectId,
    product: String,
    amount: Number,
});

module.exports = mongoose.model('Order', orderSchema);
