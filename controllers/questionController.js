const questionModel = require("../models/questionModel");

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
