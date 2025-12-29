require("dotenv").config();
require("./dbConfig");
const express = require("express");
const cors = require("cors");
const { createServer } = require("http");
const routes = require("./routes");
const socket = require("./socket");
const baseURL = require("./baseURL");

const app = express();

app.use(
  cors({
    origin: baseURL,
  })
);
app.use(express.json());
app.use(routes);

const server = createServer(app);
socket(server);

const PORT = 3000;
server.listen(PORT, () => {
  console.log("Server running on port:", PORT);
});
