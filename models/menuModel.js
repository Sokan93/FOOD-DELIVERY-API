const mongoose = require("mongoose")

const menuSchema = mongoose.Schema({
  itemName: {type: String},
  description: {type: String},
  price: {type: Number},
  availability: {type: Boolean}
})

const Menu = new mongoose.model('Menu', menuSchema) 

module.exports = Menu;