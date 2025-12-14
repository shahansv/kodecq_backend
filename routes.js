const express = require("express");
const authController = require("./controllers/authController");
const { model } = require("mongoose");

const routes = new express.Router();

routes.post("/register", authController.registerUser);
routes.post("/login", authController.loginUser);
routes.post("/googleLogin", authController.googleLogin);

module.exports = routes;
