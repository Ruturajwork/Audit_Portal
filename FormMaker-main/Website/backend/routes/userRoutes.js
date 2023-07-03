import express from "express";
import {
  registerUser,
  authUser,
  getUsers,
  deleteUser,
  getUserById,
  updateUser,
  getUserProfile,
  updateUserProfile,
} from "../controllers/userController.js";
import { protect, admin } from "../middlewares/authMiddleware.js";

const router = express.Router();

router
  .route("/")
  .post(protect, admin, registerUser)
  .get(protect, admin, getUsers);

router.post("/login", authUser);
router
  .route("/profile")
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);
router
  .route("/:id")
  .delete(protect, admin, deleteUser)
  .get(protect, admin, getUserById)
  .put(protect, admin, updateUser);

export default router;
