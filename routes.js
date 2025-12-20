const express = require("express");
const authController = require("./controllers/authController");
const workspaceController = require("./controllers/workspaceController");

const routes = new express.Router();

routes.post("/register", authController.registerUser);
routes.post("/login", authController.loginUser);
routes.post("/googleLogin", authController.googleLogin);
routes.post("/createWorkspace", workspaceController.createWorkspace);
routes.get(
  "/checkWorkspaceExist/:code",
  workspaceController.checkWorkspaceExist
);

module.exports = routes;
