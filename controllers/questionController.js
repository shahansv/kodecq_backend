const questionModel = require("../models/questionModel");
const answerModel = require("../models/answerModel");

exports.AddQuestion = async (req, res) => {
  try {
    const { language, title, problem, code, userId } = req.body;

    if (language == "" || title == "" || problem == "" || userId == "") {
      return res.status(400).json({ message: "Please fill all the fields" });
    } else {
      const newQuestion = new questionModel({
        language,
        title,
        problem,
        code,
        askedBy: userId,
      });

      await newQuestion.save();

      return res.status(201).json({ message: "Question added successfully" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong in server" });
  }
};

exports.getQuestions = async (req, res) => {
  try {
    let searchKey = req.query.search;

    let query = {
      title: {
        $regex: searchKey,
        $options: "i",
      },
    };

    let questionData = await questionModel
      .find(query)
      .sort({ createdAt: -1 })
      .populate("askedBy", "name profilePhoto profession");

    res
      .status(200)
      .json({ message: "all question data fetched", questionData });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong in server" });
  }
};

exports.viewQuestion = async (req, res) => {
  try {
    const { id } = req.params;

    const questionData = await questionModel
      .findById(id)
      .populate("askedBy", "name profilePhoto profession");

    const answerData = await answerModel
      .find({ questionId: id })
      .populate("answeredBy", "name profilePhoto profession")
      .sort({ createdAt: -1 });

    res.status(200).json({
      message: "Question and answers fetched successfully",
      question: questionData,
      answers: answerData,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong in server" });
  }
};

exports.addAnswer = async (req, res) => {
  try {
    const { id } = req.params;
    const { answer, code, userId } = req.body;

    const newAnswer = new answerModel({
      questionId: id,
      answer,
      code,
      answeredBy: userId,
    });
    await newAnswer.save();
    return res.status(201).json({ message: "Answer added successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong in server" });
  }
};

exports.getMyQuestions = async (req, res) => {
  try {
    const { id } = req.params;

    const myQuestions = await questionModel
      .find({ askedBy: id })
      .sort({ createdAt: -1 });

    res.status(200).json({
      message: "My questions fetched successfully",
      myQuestions,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong in server" });
  }
};

exports.deleteQuestion = async (req, res) => {
  try {
    const { id } = req.params;
    let deletedQuestion = await questionModel.findByIdAndDelete({ _id: id });
    res
      .status(200)
      .json({ message: "Question deleted successfully", deletedQuestion });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong in server" });
  }
};

exports.editQuestion = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, problem, code } = req.body;
    let updatedQuestion = await questionModel.findByIdAndUpdate(
      { _id: id },
      { title, problem, code },
      { new: true }
    );
    res
      .status(200)
      .json({ message: "Question updated successfully", updatedQuestion });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong in server" });
  }
};

exports.deleteAnswer = async (req, res) => {
  try {
    const { id } = req.params;
    let deletedAnswer = await answerModel.findByIdAndDelete({ _id: id });
    res
      .status(200)
      .json({ message: "Answer deleted successfully", deletedAnswer });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong in server" });
  }
};
