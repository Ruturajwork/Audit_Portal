import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import generateToken from "../utlis/generateToken.js";

// @desc    Auth User & Get Token
// @route   GET /api/users/login
// @access  public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      fname: user.fname,
      lname: user.lname,
      email: user.email,
      token: generateToken(user._id),
      isAdmin: user.isAdmin,
      isSuperAdmin: user.isSuperAdmin,
    });
  } else {
    res.status(401); // Unauthorized
    throw new Error("Invalid email or password");
  }
});

// @desc    Register New User
// @route   POST /api/users
// @access  public
const registerUser = asyncHandler(async (req, res) => {
  const { fname, lname, contact, email, password, department, role, isActive } =
    req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400); // Bad Request
    throw new Error("User already exists");
  }
  const user = await User.create({
    fname,
    lname,
    email,
    contact,
    password,
    department,
    role,
    isActive,
  });

  if (user) {
    // 201 - Successfully created
    res.status(201).json({
      message: "Successfully created",
    });
  } else {
    res.status(400); // Bad Request
    throw new Error("Invalid user data");
  }
});

// @desc    Get all users
// @route   GET /api/users
// @access  private/admin
const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({}).select("-password");
  res.json(users);
});

// @desc    Delete user
// @route   DELETE /api/users/:id
// @access  private/admin
const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    await user.remove();
    res.json({ message: "User deleted" });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// @desc    Get User Profile
// @route   GET /api/users/profile
// @access  private
const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  console.log(req.user._id);
  if (user) {
    res.json({
      _id: user._id,
      fname: user.fname,
      lname: user.lname,
      email: user.email,
      isAdmin: user.idAdmin,
      isSuperAdmin: user.isSuperAdmin,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  private
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.fname = req.body.fname || user.fname;
    user.lname = req.body.lname || user.lname;
    user.email = req.body.email || user.email;
    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      fname: updatedUser.fname,
      lname: updatedUser.lname,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      isSuperAdmin: updatedUser.isSuperAdmin,
      token: generateToken(updatedUser._id),
    });
  } else {
    res.status(404);
    throw new Error("User not found!");
  }
});

// @desc    Get user by ID
// @route   GET /api/users/:id
// @access  private/admin
const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select("-password");

  if (user) {
    res.json(user);
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// @desc    Update user
// @route   PUT /api/users/:id
// @access  private/admin
const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    user.fname = req.body.fname || user.fname;
    user.lname = req.body.lname || user.lname;
    user.contact = req.body.contact || user.contact;
    user.email = req.body.email || user.email;
    if (req.body.password) {
      user.password = req.body.password;
    }
    user.department = req.body.department || user.department;
    user.isAdmin = req.body.isAdmin;
    user.role = req.body.role || user.role;
    user.isActive = req.body.isActive;

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      fname: updatedUser.fname,
      lname: updatedUser.lname,
      contact: updatedUser.contact,
      email: updatedUser.email,
      department: updatedUser.department,
      isAdmin: updatedUser.isAdmin,
      role: updatedUser.role,
      isActive: updatedUser.isActive,
      isSuperAdmin: updatedUser.isSuperAdmin,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

export {
  registerUser,
  authUser,
  getUsers,
  deleteUser,
  getUserProfile,
  updateUserProfile,
  updateUser,
  getUserById,
};
