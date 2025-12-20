const express = require("express");
const authController = require("./controllers/authController");
const workSpaceController = require("./controllers/workSpaceController");

const routes = new express.Router();

routes.post("/register", authController.registerUser);
routes.post("/login", authController.loginUser);
routes.post("/googleLogin", authController.googleLogin);
routes.post("/createWorkspace", workSpaceController.createWorkspace);
routes.get(
  "/checkWorkspaceExist/:code",
  workSpaceController.checkWorkspaceExist
);

module.exports = routes;
