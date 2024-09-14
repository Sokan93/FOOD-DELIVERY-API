const mongoose = require("mongoose")

const restaurantSchema = mongoose.Schema({
  name: {type: String},
  location: {type: String},
  contactInfo: {type: Number}
})

const Restaurant = new mongoose.model('Restaurant', restaurantSchema) 

module.exports = Restaurant;