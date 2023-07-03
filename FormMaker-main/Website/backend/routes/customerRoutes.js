import express from "express";
import {
  registerCustomer,
  getCustomers,
  deleteCustomer,
  getCustomerById,
  updateCustomer,
  authCustomer,
  getCustomerProfile,
  updateCustomerProfile,
  verifiyCustomers,
  sendOtp,
  verifyOtp,
  verifyResendOtp,
  resetPassword,
  resetCustomer,
} from "../controllers/customerController.js";
import {
  protect,
  admin,
  customerProtect,
} from "../middlewares/authMiddleware.js";

const router = express.Router();

router
  .route("/")
  .post(protect, admin, registerCustomer)
  .get(protect, admin, getCustomers);

router.post("/clogin", authCustomer);
router
  .route("/:id")
  .delete(protect, admin, deleteCustomer)
  .get(protect, admin, getCustomerById)
  .put(protect, admin, updateCustomer);

{
  /*this routes for gettting customer details after customer login in customerProfileScreen*/
}
router
  .route("/pr/:id")
  .get(customerProtect, getCustomerProfile)
  .put(customerProtect, updateCustomerProfile);
router
  .route("pr/profile")
  .get(customerProtect, getCustomerProfile)
  .put(customerProtect, updateCustomerProfile);

router.route("/customer/otp").post(sendOtp);

router.route("/verify").post(verifyOtp);

router.route("/resend").post(verifyResendOtp);

router.route("/forgetpassword/:token").post(resetPassword);

router.route("/reset").post(resetCustomer);

export default router;
