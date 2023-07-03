import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const CustomerOtpVerificationSchema = mongoose.Schema({
  customerEmailId: {
    type: String,
  },
  otp: {
    type: String,
  },
  createAt: {
    type: Date,
  },
  expireAt: {
    type: Date,
  },
});

const CustomerOtpVerification = mongoose.model(
  "CustomerOtpVerification",
  CustomerOtpVerificationSchema
);

export default CustomerOtpVerification;
