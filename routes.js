const express = require("express");
const authController = require("./controllers/authController");
const {
  createWorkspace,
  checkWorkspaceExist,
} = require("./controllers/workSpaceController");

const routes = new express.Router();

routes.post("/register", authController.registerUser);
routes.post("/login", authController.loginUser);
routes.post("/googleLogin", authController.googleLogin);
routes.post("/createWorkspace", createWorkspace);
routes.get("/checkWorkspaceExist/:code", checkWorkspaceExist);

module.exports = routes;
