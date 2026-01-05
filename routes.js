const express = require("express");

const jwtMiddleware = require("./middlewares/jwtMiddleware");
const multerMiddleware = require("./middlewares/multerMiddleware");

const authController = require("./controllers/authController");
const workspaceController = require("./controllers/workspaceController");
const userController = require("./controllers/userController");
const questionController = require("./controllers/questionController");

const routes = new express.Router();

routes.post("/register", authController.register);
routes.post("/login", authController.login);
routes.post("/googleLogin", authController.googleLogin);
routes.post("/createWorkspace", jwtMiddleware, workspaceController.createWorkspace);
routes.get("/checkWorkspaceExist/:code", jwtMiddleware, workspaceController.checkWorkspaceExist);
routes.get("/userDetails", jwtMiddleware, userController.userDetails);
routes.patch("/editProfile/:id", jwtMiddleware, userController.editProfile);
routes.patch("/changePassword/:id", jwtMiddleware, userController.changePassword);
routes.patch("/removeProfilePhoto/:id", jwtMiddleware, userController.removeProfilePhoto);
routes.patch("/changeProfilePhoto/:id", jwtMiddleware, multerMiddleware.single("profilePhoto"), userController.changeProfilePhoto);
routes.post("/addQuestion", jwtMiddleware, questionController.AddQuestion);
routes.get("/getQuestions", jwtMiddleware, questionController.getQuestions);
module.exports = routes;
