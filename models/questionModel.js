const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema(
  {
    language: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    problem: {
      type: String,
      required: true,
    },
    code: {
      type: String,
    },
    askedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
  },
  { timestamps: true }
);

const questionModel = mongoose.model("questions", questionSchema);
module.exports = questionModel;
