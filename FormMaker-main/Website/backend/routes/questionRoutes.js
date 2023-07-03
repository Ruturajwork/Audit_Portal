import express from "express";
import {
  createQuestions,
  getQuestions,
  deleteQuestion,
  getQuestionById,
  getStdQuestions,
  updateQuestion,
  getQuestionDetailsById,
} from "../controllers/questionsController.js";

const router = express.Router();

router.route("/").post(createQuestions).get(getQuestions); //.put(userData);
router.route("/std").get(getStdQuestions);

router.route("/question/data/:id").get(getQuestionDetailsById);
router
  .route("/question/:id")
  .delete(deleteQuestion)
  .get(getQuestionById)
  .put(updateQuestion);

export default router;
