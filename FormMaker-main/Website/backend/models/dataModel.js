import mongoose from "mongoose";

const userRolesSchema = mongoose.Schema(
  {
    // user: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "User",
    //   required: true,
    // },
    roles: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Role = mongoose.model("Roles", userRolesSchema);

const userDepartmentSchema = mongoose.Schema(
  {
    departments: {
      type: String,
    },
    // user: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "User",
    //   required: true,
    // },
  },
  { timestamps: true }
);
const Department = mongoose.model("Departments", userDepartmentSchema);

// const dataSchema = mongoose.Schema({
//   role: [userRolesSchema],
//   department: [userDepartmentSchema],
// });

// const Data = mongoose.model("UserData", dataSchema);

const standardSchema = mongoose.Schema(
  {
    standards: {
      type: String,
    },
  },
  { timestamps: true }
);

const Standard = mongoose.model("Standard", standardSchema);

export { Department, Role, Standard };
