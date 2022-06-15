const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
require("dotenv").config();

const generateToken = (user) => {
  // generate token
  return jwt.sign({ user }, process.env.KEY);
};

const register = async (req, res) => {
  // register user
  try {
    let user = await User.findOne({ email: req.body.email }); // check if user exists
    if (user) {
      return res.status(400).send({ message: "User already exists" }); // if user exists, return error
    }
    user = await User.create(req.body); // create user
    const token = generateToken(user); // generate token
    return res.status(200).send({ user, token }); // return user and token
  } catch (e) {
    return res.status(500).send({ message: e.message }); // return error
  }
};

const login = async (req, res) => {
  // login user
  try {
    let user = await User.findOne({ email: req.body.email }); // check if user exists

    if (!user) {
      return res.status(400).send({ message: "Wrong Email or Password" }); // if user doesn't exist, return error
    }

    const validPassword = await user.comparePassword(req.body.password); // check if password is valid

    if (!validPassword) {
      return res.status(400).send({ message: "Wrong Email or Password" }); // if password is invalid, return error
    }
    const token = generateToken(user); // generate token

    return res.status(200).send({ user, token }); // return user and token
  } catch (e) {
    return res.status(500).send({ message: e.message }); // return error
  }
};

const token = async (req, res) => {
  // check token
  try {
    const token = req.header("Authorization").replace("Bearer", ""); // get token
    const user = jwt.verify(token, process.env.KEY); // verify token
    return res.status(200).send({ user, token }); // return user
  } catch (e) {
    return res.status(500).send({ message: e.message }); // return error
  }
};

module.exports = { register, login, token };
