const mongoose = require("mongoose");

const answerSchema = new mongoose.Schema(
  {
    questionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "questions",
      required: true,
    },
    answer: {
      type: String,
      required: true,
    },
    code: {
      type: String,
    },
    answeredBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
  },
  { timestamps: true }
);

const answerModel = mongoose.model("answers", answerSchema);
module.exports = answerModel;
