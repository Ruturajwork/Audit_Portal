import asyncHandler from "express-async-handler";
import Customer from "../models/customerModel.js";
import { Role, Department, Standard } from "../models/dataModel.js";

// @desc   Get all Role
// @route   Get /api/data
// @access  private
const getAllUserRole = asyncHandler(async (req, res) => {
  const roles = await Role.find({});
  res.json(roles);
  //data.map((dat) => console.log(dat.roles));
});

// @desc    Add New Role
// @route   POST /api/data
// @access  private
const addUserRole = asyncHandler(async (req, res) => {
  const { roles } = req.body;

  const data = await new Role({
    roles,
  });
  await data.save();
  if (data) {
    // 201 - Successfully created
    res.status(201).json({
      message: "Successfully created",
    });
  } else {
    res.status(400); // Bad Request
    throw new Error("Invalid data");
  }
});

// @desc    Delete Role
// @route   DELETE /api/data/:id
// @access  private/admin
const deleteUserRole = asyncHandler(async (req, res) => {
  const data = await Role.findById(req.params.id);

  if (data) {
    await data.remove();
    res.json({ message: "Data deleted" });
  } else {
    res.status(404);
    throw new Error("Data not found");
  }
});

// @desc    Get Role by ID
// @route   GET /api/data/:id
// @access  private/admin
const getRoleById = asyncHandler(async (req, res) => {
  const data = await Role.findById(req.params.id);

  if (data) {
    res.json(data);
  } else {
    res.status(404);
    throw new Error("Data not found");
  }
});

// @desc Get All Departments
// @desc Get /api/data
// @access private/admin
const getAllUserDepartment = asyncHandler(async (req, res) => {
  const departments = await Department.find({});
  res.json(departments);
});

// @desc Add new Department
// @desc Post/api/data
// @access private/admin
const addUserDepartment = asyncHandler(async (req, res) => {
  const { departments } = req.body;

  const data = await new Department({
    departments,
  });
  await data.save();
  if (data) {
    //201 -Succesfully Created
    res.status(201).json({
      message: "Successfully Created",
    });
  } else {
    res.status(400); //Bad request
    throw new Error("Invalid Data");
  }
});

// @Delete Department
// @DELETE /api/data/:id
// @access private/admin
const deleteUserDepartment = asyncHandler(async (req, res) => {
  const data = await Department.findById(req.params.id);

  if (data) {
    await data.remove();
    res.json({ message: "Data deleted" });
  } else {
    res.status(404);
    throw new Error("Data not found");
  }
});

// @desc Get Department by Id
// @desc Get /api/data/department/:id
// @access Private/admin
const getDepartmentById = asyncHandler(async (req, res) => {
  const data = await Department.findById(req.params.id);

  if (data) {
    res.json(data);
  } else {
    res.status(404);
    throw new Error("Data not found");
  }
});

// @desc Update Department by Id
// @desc Put /api/data/department/:id
// @access Private/admin
const updateDepartments = asyncHandler(async (req, res) => {
  const userDepartment = await Department.findById(req.params.id);

  if (userDepartment) {
    userDepartment.departments =
      req.body.departments || userDepartment.departments;

    await userDepartment.save();
    res.json({ message: "Successfuly Updated" });
  } else {
    res.status(404);
    throw new Error("Department not found");
  }
});

// @desc Update Role
// @desc Put /api/data/role/:id
// @access Private/admin
const updateRoles = asyncHandler(async (req, res) => {
  const userRole = await Role.findById(req.params.id);

  if (userRole) {
    userRole.roles = req.body.roles || userRole.roles;

    await userRole.save();
    res.json({ message: "Successfuly Updated" });
  } else {
    res.status(404);
    throw new Error("Role not found");
  }
});

// @desc Create Standard
// @desc POST /api/data/standard
// @access Private/admin
const createStandard = asyncHandler(async (req, res) => {
  const { standards } = req.body;

  const data = await new Standard({
    standards,
  });
  console.log(standards);
  await data.save();
  if (data) {
    // 201 - Successfully createds
    res.status(201).json({
      message: "Successfully created",
    });
  } else {
    res.status(400); // Bad Request
    throw new Error("Invalid data");
  }
});

// @desc   Get all Standards
// @route   Get /api/data
// @access  private
const getAllStandards = asyncHandler(async (req, res) => {
  const standards = await Standard.find({});
  res.json(standards);
});

// @desc    Delete Standard
// @route   DELETE /api/data/:id
// @access  private/admin
const deleteStandard = asyncHandler(async (req, res) => {
  const data = await Standard.findById(req.params.id);

  if (data) {
    await data.remove();
    res.json({ message: "Standard Data deleted" });
  } else {
    res.status(404);
    throw new Error("Data not found");
  }
});

// @desc    Get Standard by ID
// @route   GET /api/data/:id
// @access  private/admin
const getStandardById = asyncHandler(async (req, res) => {
  const data = await Standard.findById(req.params.id);

  if (data) {
    res.json(data);
  } else {
    res.status(404);
    throw new Error("Data not found");
  }
});

// @desc Update Standard
// @desc Put /api/data/standard/:id
// @access Private/admin
const updateStandard = asyncHandler(async (req, res) => {
  const standardData = await Standard.findById(req.params.id);

  if (standardData) {
    standardData.standards = req.body.standards || standardData.standards;

    await standardData.save();
    res.json({ message: "Successfuly Updated" });
  } else {
    res.status(404);
    throw new Error("Role not found");
  }
});
export {
  deleteUserDepartment,
  getDepartmentById,
  getAllUserDepartment,
  addUserDepartment,
  deleteUserRole,
  getRoleById,
  addUserRole,
  getAllUserRole,
  updateDepartments,
  updateRoles,
  createStandard,
  getAllStandards,
  deleteStandard,
  getStandardById,
  updateStandard,
};
