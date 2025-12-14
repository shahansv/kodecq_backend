const userModel = require("../models/userModel");
const JWT = require("jsonwebtoken");

exports.registerUser = async (req, res) => {
  try {
    let name = req.body.name;
    let email = req.body.email;
    let password = req.body.password;

    if (name && email && password) {
      let existingUser = await userModel.findOne({ email: email });
      if (existingUser) {
        res
          .status(409)
          .json({ message: "User with this email id already registered" });
      } else {
        let newUser = new userModel({
          name,
          email,
          password,
        });
        await newUser.save();
        res
          .status(201)
          .json({ message: "User successfully registered", newUser });
      }
    } else {
      res.status(400).json({ message: "Please fill the form" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong in server" });
  }
};

exports.loginUser = async (req, res) => {
  try {
    let email = req.body.email;
    let password = req.body.password;
    if (email && password) {
      let existingUser = await userModel.findOne({ email: email });
      if (existingUser) {
        if (existingUser.password == password) {
          let payLoad = {
            name: existingUser.name,
            email: existingUser.email,
          };
          let token = JWT.sign(payLoad, process.env.jwtSecretkey);
          res.status(200).json({ message: "Login Successful", token });
        } else {
          res.status(400).json({ message: "Invalied Password" });
        }
      } else {
        res
          .status(400)
          .json({ message: "User with this email does not exist" });
      }
    } else {
      res.status(400).json({ message: "Please fill the form" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Somthing went wrong in server" });
  }
};

exports.googleLogin = async (req, res) => {
  try {
    let { email, name, profilePhoto } = req.body;
    let existingUser = await userModel.findOne({ email: email });
    if (existingUser) {
      let payLoad = {
        name: existingUser.name,
        email: existingUser.email,
      };
      let token = JWT.sign(payLoad, process.env.jwtSecretkey);
      res.status(200).json({ message: "Login Successfully", token });
    } else {
      let newUser = new userModel({
        name,
        email,
        password: "googlePassword",
        profilePhoto,
      });
      await newUser.save();
      let payLoad = {
        name: newUser.name,
        email: newUser.email,
      };
      let token = JWT.sign(payLoad, process.env.jwtSecretkey);
      res.status(201).json({ message: "Login Successfully", token });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Somthing went wrong in server" });
  }
};
