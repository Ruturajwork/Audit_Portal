import express from "express";
import {
  deleteUserRole,
  getRoleById,
  addUserRole,
  getAllUserRole,
  deleteUserDepartment,
  getDepartmentById,
  getAllUserDepartment,
  addUserDepartment,
  updateDepartments,
  updateRoles,
  createStandard,
  getAllStandards,
  deleteStandard,
  getStandardById,
  updateStandard,
} from "../controllers/dataController.js";

const router = express.Router();

router.route("/role").post(addUserRole).get(getAllUserRole); //.put(userData);

router
  .route("/role/:id")
  .delete(deleteUserRole)
  .get(getRoleById)
  .put(updateRoles);

router.route("/department").post(addUserDepartment).get(getAllUserDepartment);

router
  .route("/department/:id")
  .get(getDepartmentById)
  .delete(deleteUserDepartment)
  .put(updateDepartments);

router.route("/standard").post(createStandard).get(getAllStandards); //.put(userData);

router
  .route("/standard/:id")
  .delete(deleteStandard)
  .get(getStandardById)
  .put(updateStandard);

export default router;
