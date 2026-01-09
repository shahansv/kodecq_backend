const userModel = require("../models/userModel");
const JWT = require("jsonwebtoken");

exports.register = async (req, res) => {
  try {
    let { name, email, password } = req.body;
    if (name && email && password) {
      let existingUser = await userModel.findOne({ email: email });
      if (existingUser) {
        res.status(409).json({ message: "This email is already registered" });
      } else {
        let newUser = new userModel({
          name,
          email,
          password,
          profilePhoto:
            "https://ik.imagekit.io/shahansv/kodecq/assets/NoProfilePhoto.svg?updatedAt=1767897694129",
        });
        await newUser.save();
        res
          .status(201)
          .json({ message: "User registered successfully", newUser });
      }
    } else {
      res.status(400).json({ message: "Please fill in all required fields" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong on the server" });
  }
};

exports.login = async (req, res) => {
  try {
    let { email, password } = req.body;
    if (email && password) {
      let existingUser = await userModel.findOne({ email: email });
      if (existingUser) {
        if (existingUser.password == password) {
          let payLoad = {
            name: existingUser.name,
            email: existingUser.email,
          };
          let token = JWT.sign(payLoad, process.env.JWT_SECRET_KEY);
          let user = {
            name: existingUser.name,
            profilePhoto: existingUser.profilePhoto,
            userId: existingUser._id,
          };
          res.status(200).json({ message: "Login successful", token, user });
        } else {
          res.status(400).json({ message: "Invalid password" });
        }
      } else {
        res.status(400).json({ message: "No user found with this email" });
      }
    } else {
      res.status(400).json({ message: "Please fill in all required fields" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong on the server" });
  }
};

exports.googleLogin = async (req, res) => {
  try {
    let { email, name, profilePhoto } = req.body;
    if (profilePhoto) {
      profilePhoto = profilePhoto.split("=")[0];
    } else {
      profilePhoto =
        "https://ik.imagekit.io/shahansv/kodecq/assets/NoProfilePhoto.svg?updatedAt=1767897694129";
    }
    let existingUser = await userModel.findOne({ email: email });
    if (existingUser) {
      let payLoad = {
        name: existingUser.name,
        email: existingUser.email,
      };
      let token = JWT.sign(payLoad, process.env.JWT_SECRET_KEY);
      let user = {
        name: existingUser.name,
        profilePhoto: existingUser.profilePhoto,
        userId: existingUser._id,
      };
      res.status(200).json({ message: "Login successful", token, user });
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
      let token = JWT.sign(payLoad, process.env.JWT_SECRET_KEY);
      let user = {
        name: newUser.name,
        profilePhoto: newUser.profilePhoto,
        userId: newUser._id,
      };
      res.status(201).json({ message: "Login successful", token, user });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong on the server" });
  }
};
