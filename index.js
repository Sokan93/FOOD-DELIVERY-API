const http = require("http");
const express = require('express');
const dotenv = require("dotenv").config();
const mongoose = require("mongoose")
const Restaurant = require("./models/restaurantModel")
const Menu = require("./models/menuModel")
const Order = require("./models/orderModel")


const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true })); //Takes out query parameters from URL on Postman
app.use('/api', require('./routes/userRoutes'))


const PORT = process.env.PORT

//Port listening
app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`)
})

//Database Connection 
mongoose.connect(`${process.env.MONGODB_URL}`)
  .then(() => console.log('Database Connected!'));




