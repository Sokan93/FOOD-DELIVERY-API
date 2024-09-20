const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const User = require("../models/userModel")


const registerUser = async (req, res) => {
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
      password: user.password, //testing to confirm password hashing 
      token: generateToken(user._id),
    })
  } else {
    res.status(400).json({message: 'Invalid user data'})
  }
}

const loginUser = async(req, res) => {
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
}

const generateToken = (id) => {
  return jwt.sign({id}, process.env.JWT_SECRET, {
    expiresIn: '30d',
  })
}

module.exports = {
  registerUser,
  loginUser,
}