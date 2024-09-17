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
app.use(express.urlencoded({ extended: true })); //Takes out query parameters from URL on Postman

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
  }

  //Check if user exists
  const userExists = await User.findOne({email})

  if(userExists) {
    res.status(400).json({message: "User already exists"})
  }

  const salt = await bcrypt.genSalt(12)
  const hashedPassword = await bcrypt.hash(password, salt)

  //Create User
  const user = await User.create({
    username,
    email,
    password: hashedPassword
  })

  if(user) {
    res.status(201).json({
      _id: user.id,
      username: user.username,
      email: user.email,
      password: user.password //testing to confirm password hashing 
    })
  } else {
    res.status(400).json({message: 'Invalid user data'})
  }



})

//Login User
app.post('/api/login-user', async (req, res) => {
  const {email, password} = req.body
  const user = await User.findOne({email})
  if(user && (await bcrypt.compare(password, user.password))) {
    res.status(200).json({
      _id: user.id,
      username: user.username,
      email: user.email,
    })
  } else {
    res.status(400).json({message: "Invalid Login Details"})
  }
  
})

//Create Restaurants

//

