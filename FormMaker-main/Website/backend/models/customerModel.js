import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const subcustomerSchema = mongoose.Schema({
  cfname: { type: String, required: true },
  clname: { type: String, required: true },
  cEmail: { type: String, required: true },
  cPassword: { type: String, required: true },
});
const customerSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    fname: {
      type: String,
      required: true,
    },
    lname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    contact: {
      type: String,
      required: true,
    },
    department: {
      type: String,
      required: true,
    },
    project: [
      {
        type: String,
        // type: mongoose.Schema.Types.ObjectId,
        //  ref: "CreateProject",
        required: true,
        // required: true,
      },
    ],
    password: {
      type: String,
      required: true,
    },
    isActive: {
      type: Boolean,
      required: true,
      default: false,
    },
    emailToken: {
      type: String,
    },
  },
  { timestamps: true }
);

customerSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

customerSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

const Customer = mongoose.model("Customer", customerSchema);

export default Customer;
