require("dotenv").config();

require("./dbConfig");

const express = require("express");
const cors = require("cors");
const routes = require("./routes");

const server = new express();
server.use(cors());
server.use(express.json());
server.use(routes);

const port = 3000;
server.listen(port, () => {
  console.log("Server is listening at port: ", port);
});
