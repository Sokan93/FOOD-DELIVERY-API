const mongoose = require("mongoose")

const orderSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  restaurant: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Restaurant',
  },
  orderedItems: {
    type: String,
    required: true,
  },
  totalCost: {
    type: Number,
  },
  orderStatus: {
    type: String,
    enum: ['pending', 'preparing', 'out for delivery', 'delivered'],
  },
})

const Order = new mongoose.model('Order', orderSchema)

module.exports = Order;












