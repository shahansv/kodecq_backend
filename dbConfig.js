const mongoose = require("mongoose");

mongoose
  .connect(process.env.connectionString)
  .then((res) => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.log(error);
  });
