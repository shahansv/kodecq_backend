const express = require("express");
const authController = require("./controllers/authController");
const workspaceController = require("./controllers/workspaceController");
const jwtMiddleware = require("./middlewares/jwtMiddleware");

const routes = new express.Router();

routes.post("/register", authController.registerUser);
routes.post("/login", authController.loginUser);
routes.post("/googleLogin", authController.googleLogin);
routes.post("/createWorkspace", jwtMiddleware, workspaceController.createWorkspace);
routes.get("/checkWorkspaceExist/:code", jwtMiddleware, workspaceController.checkWorkspaceExist);

module.exports = routes;
