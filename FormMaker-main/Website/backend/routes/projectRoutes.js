import express from "express";
import {
  createProject,
  getAllProjects,
  deleteProject,
  getProjectById,
  updateProject,
  getMyProjects,
  getMyCustProjects,
  getProjectDById,
  projectEditQuestion,
  copyToVersion2,
  projectEditVersion3Question,
  projectEditVersion2Question,
  copyToVersion3,
  // getProjectQById,
} from "../controllers/createProjectController.js";

import {
  protect,
  admin,
  customerProtect,
} from "../middlewares/authMiddleware.js";

const router = express.Router();

router.route("/").post(createProject).get(getAllProjects);
router.route("/myprojects").get(protect, getMyProjects);

router.route("/project/data/:id").get(getProjectDById).put(projectEditQuestion);
router.route("/project/data/v2/:id").put(projectEditVersion2Question);
router.route("/project/data/v3/:id").put(projectEditVersion3Question);

router.route("/copy/v2/:id").put(copyToVersion2);
router.route("/copy/v3/:id").put(copyToVersion3);
router
  .route("/project/:id")
  .delete(deleteProject)
  .get(getProjectById)
  .put(updateProject);

{
  /* customer Routes */
}
router.route("/mycprojects").get(customerProtect, getMyCustProjects);
router.route("/cproject/:id").get(customerProtect, getProjectById);

export default router;
