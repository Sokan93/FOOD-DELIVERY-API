const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  userRoles: {
    type: String,
    enum: ['customer', 'restaurant owner', 'delivery personnel'],
    default: 'customer'
  },
  
}, 
{
  timestamps: true
})

const User = new mongoose.model('User', userSchema) 

module.exports = User;