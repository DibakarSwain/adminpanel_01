const User = require("../models/user-model");
const bcrypt = require("bcryptjs");
// in an Express.js application, a "controller" refers to a part of your code that is responsible for handling the application's logic. Controllers are typically used to process incoming requests, interact with models (data sources), and send responsed back to clients. They help organize your application by separating concerns and following the MVC design pattern.

// -----------------
// Home logic
// --------------------

const home = async (req, res) => {
  try {
    res.status(200).send("Welcome to home page using router");
  } catch (err) {
    console.log(err);
  }
};

// --------------------
// register logiv
// -----------------------

const register = async (req, res) => {
  try {
    // console.log(req.body);
    const { username, email, phone, password } = req.body;

    const userExist = await User.findOne({ email: email });
    console.log(userExist);

    if (userExist) {
      return res.status(400).json({ message: "email already exist" });
    }

    const userCreated = await User.create({
      username,
      email,
      phone,
      password,
    });

    res.status(200).json({
      message: "registration successfull",
      token: await userCreated.generateToken(),
      userid: userCreated._id.toString(),
    });
  } catch (err) {
    // res.status(500).json("internal server error");
    next(err);
  }
};

// in most cases, converting _id to a string is a good practise.

// login logic
const login = async (req, res) => {
  console.log("login");

  try {
    const { email, password } = req.body;

    const userExist = await User.findOne({ email });

    if (!userExist) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    // --------------------------------------------
    // const user = await bcrypt.compare(password, userExist.password);
    // ------------------------------------------
    // create custom password
    const user = await userExist.comparePassword(password);

    if (user) {
      res.status(200).json({
        message: "login successfull",
        token: await userExist.generateToken(),
        userid: userExist._id.toString(),
      });
    } else {
      res.status(401).json({ message: "invalid email or pswd" });
    }
  } catch (error) {
    res.status(500).json("Internal server Error");
  }
};

// --------------------------------------
// user logic : to send user data
// ---------------------------------------

const user = async (req, res) => {
  try {
    const userData = req.user;
    console.log(userData);
    return res.status(200).json({ userData });
  } catch (error) {
    console.log(`Error from the user route ${error}`);
  }
};

module.exports = { home, register, login, user };
