const mongoose = require("mongoose")

const restaurantSchema = mongoose.Schema({
  name: {type: String},
  location: {type: String},
  contactInfo: {type: Number},
  menu: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Menu',
  },
})

const Restaurant = new mongoose.model('Restaurant', restaurantSchema) 

module.exports = Restaurant;