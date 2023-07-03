import asyncHandler from "express-async-handler";
import Questions from "../models/questionsModel.js";
import { Role, Department, Standard } from "../models/dataModel.js";
// @desc    Add New Question
// @route   POST /api/questions
// @access  private
const createQuestions = asyncHandler(async (req, res) => {
  const {
    header,
    standard,
    question,
    areaofaudit,
    description,
    expectedProofs,
    subHeader1,
    subHeader2,
    subHeader3,
    subHeader4,
    subHeader5,
  } = req.body;
  console.log(question);
  const standId = await Standard.findOne({ standard });
  if (standId) {
    // res.json({ id: standId.id });
    console.log(standId.id); // Bad Request
  }
  const questionData = await Questions.create({
    header,
    standardId: standId._id,
    standard,
    subHeader1,
    subHeader2,
    subHeader3,
    subHeader4,
    subHeader5,
    questions: {
      question: question,
      areaofaudit: areaofaudit,
      description: description,
      expectedProofs: expectedProofs,
    },
  });
  if (questionData) {
    // 201 - Successfully created
    res.status(201).json({
      message: "Successfully created",
    });
  } else {
    res.status(400); // Bad Request
    throw new Error("Invalid user data");
  }
});

// @desc Get All Questions
// @router GET /api/questions
// @access private/admin
const getQuestions = asyncHandler(async (req, res) => {
  const questions = await Questions.find({});
  res.json(questions);
});

const getStdQuestions = asyncHandler(async (req, res) => {
  const { standard } = req.body;
  const questions = await Questions.find({ standard });
  res.json(questions);
});

// @desc Delete Question
// @route DELETE /api/questions/:id
// @access private/admin
const deleteQuestion = asyncHandler(async (req, res) => {
  const question = await Questions.findById(req.params.id);

  if (question) {
    await question.remove();
    res.json({ message: "Question Deleted" });
  } else {
    res.status(404);
    throw new Error("Question not found");
  }
});

// @desc Get Question by ID
// @Route GEt /api/questions/:id
// @access private/admin
const getQuestionById = asyncHandler(async (req, res) => {
  const question = await Questions.findById(req.params.id);
  if (question) {
    res.json(question);
  } else {
    res.status(404);
    throw new Error("Question not found");
  }
});

const getQuestionDetailsById = asyncHandler(async (req, res) => {
  const question = await Questions.findById(req.params.id);
  if (question) {
    res.json(question.version1);
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// @desc PUT Update question
// @route PUT api/questions/:id
// @accesscprivate/admin
const updateQuestion = asyncHandler(async (req, res) => {
  const question = await Questions.findById(req.params.id);

  if (question) {
    question.header = req.body.header || question.header;
    question.standard = req.body.standard || question.standard;
    question.subHeader1 = req.body.subHeader1 || question.subHeader1;
    question.subHeader2 = req.body.subHeader2 || question.subHeader2;
    question.subHeader3 = req.body.subHeader3 || question.subHeader3;
    question.subHeader4 = req.body.subHeader4 || question.subHeader4;
    question.subHeader5 = req.body.subHeader5 || question.subHeader5;
    question.questions = req.body.questions || question.questions;

    const updatedQuestion = await question.save();
    res.json({
      _id: updatedQuestion._id,
      header: updatedQuestion.header,
      standard: updatedQuestion.standard,
      subHeader1: updatedQuestion.subHeader1,
      subHeader2: updatedQuestion.subHeader2,
      subHeader3: updatedQuestion.subHeader3,
      subHeader4: updatedQuestion.subHeader4,
      subHeader5: updatedQuestion.subHeader5,
      questions: updatedQuestion.questions,
    });
  } else {
    res.status(404);
    throw new Error("Question not found");
  }
});

export {
  createQuestions,
  getQuestions,
  deleteQuestion,
  getQuestionById,
  updateQuestion,
  getStdQuestions,
  getQuestionDetailsById,
};
