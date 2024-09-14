const http = require("http");
const express = require('express');
const dotenv = require("dotenv").config();
const mongoose = require("mongoose")
const User = require("./models/userModel")
const Restaurant = require("./models/restaurantModel")
const Menu = require("./models/menuModel")
const Order = require("./models/orderModel")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

const app = express()

app.use(express.json())

const PORT = process.env.PORT

//Port listening
app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`)
})

//Database Connection 
mongoose.connect(`${process.env.MONGODB_URL}`)
  .then(() => console.log('Database Connected!'));

//User Registration
app.post('/api/register-user', async (req, res) => {
  const {username, email, password} = req.body

  if(!username || !email || !password) {
    res.status(400).json({message: "Please enter your credentials"})
  }else{
    res.status(201).json({message: 'User registered'})
  }

  const salt = await bcrypt.genSalt(12)
  const hashedPassword = await bcrypt.hash(password, salt)

  //Create User
  const user = awa

})

//Login User
app.post('/api/login-user', async (req, res) => {
  res.json({message: 'Login Successful'})
  
})

//Create Restaurants

//

