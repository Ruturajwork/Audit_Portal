import asyncHandler from "express-async-handler";
import Customer from "../models/customerModel.js";
import CustomerOtpVerification from "../models/customerOtpVerificationSchema.js";
import generateToken from "../utlis/generateToken.js";
import bcrypt from "bcryptjs";
import nodemailer from "nodemailer";
import crypto from "crypto";
import dotenv from "dotenv";
dotenv.config();

let otp = Math.random();
otp = otp * 1000000;
otp = parseInt(otp);

let testAccount = await nodemailer.createTestAccount();
let transporter = nodemailer.createTransport({
  host: "sysmic.icewarpcloud.in",
  port: 465,
  secure: true, // true for 465, false for other ports
  auth: {
    user: process.env.EMAIL, // generated ethereal user
    pass: "Krishna@#$123", // generated ethereal password
  },
});

// @desc    Auth User & Get Token
// @route   GET /api/customers/login
// @access  public
const authCustomer = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const customer = await Customer.findOne({ email });

  if (customer && (await customer.matchPassword(password))) {
    res.json({
      _id: customer._id,
      fname: customer.fname,
      lname: customer.lname,
      email: customer.email,
      token: generateToken(customer._id),
      // isAdmin: customer.isAdmin,
    });
  } else {
    res.status(401); // Unauthorized
    throw new Error("Invalid email or password");
  }
});

// @desc   Create New Customer
// @route   POST /api/customers
// @access  public
const registerCustomer = asyncHandler(async (req, res) => {
  const {
    fname,
    lname,
    email,
    contact,
    password,
    department,
    isActive,
    project,
  } = req.body;

  const customerExists = await Customer.findOne({ email });
  if (customerExists) {
    res.status(400); //Bad request
    throw new Error("Customer already exists");
  }
  const customer = await Customer.create({
    user: req.user._id,
    fname,
    lname,
    email,
    contact,
    password,
    department,
    isActive,
    project,
    emailToken: crypto.randomBytes(64).toString("hex"),
  });
  if (customer) {
    // 201 - Successfully created
    const mailOptions = {
      from: process.env.EMAIL,
      to: customer.email,
      subject: "Welcome Audix",
      html: `<h5>${customer.email}, Thanx for registering our site</h5>
          <h4>Please verify your email to continue....</h4>
            <a href="http://103.251.94.72:3000/customer/verify-email?token=${customer.emailToken}">Click Here</a>`,
    };

    // send mail
    transporter.sendMail(mailOptions, function (err, info) {
      if (err) {
        console.log(err);
      } else {
        console.log(" link send to your gmail account");
      }
    });
  } else {
    res.status(400); // Bad Request
    throw new Error("Invalid customer Data");
  }
});

//    click on link

///user/verify-email
const verifiyCustomers = asyncHandler(async (req, res) => {
  // try {
  const token = req.query.token;
  const user = await Customer.findOne({ emailToken: token });
  console.log(user);
  if (user) {
    //  console.log("verified");
    res.json({ message: "Verified" });
  } else {
    res.status(400); // Bad Request
    throw new Error("Email is not verified");
  }
  // } catch (error) {
  //   console.log(error);
  // }
});

// @desc    Get all customers
// @route   GET /api/customers
// @access  private/admin
const getCustomers = asyncHandler(async (req, res) => {
  const customers = await Customer.find({}); // .select("-password");
  res.json(customers);
});

// @desc    Get customer by ID
// @route   GET /api/customer/:id
// @access  private/admin
const getCustomerById = asyncHandler(async (req, res) => {
  const customer = await Customer.findById(req.params.id).select("-password");

  if (customer) {
    res.json(customer);
  } else {
    res.status(404);
    throw new Error("customer Not Found");
  }
});

// @desc Delete Customer
// @desc DELETE /api/data/:id
// @access Private/admin
const deleteUserCustomer = asyncHandler(async (req, res) => {
  const data = await Customer.findById(req.params.id);

  if (data) {
    await data.remove();
    res.json({ message: "Data Destroyed" });
  } else {
    res.status(404);
    throw new Error("Data not Found");
  }
});

// @desc    Delete customer
// @route   DELETE /api/customer/:id
// @access  private/admin
const deleteCustomer = asyncHandler(async (req, res) => {
  const customer = await Customer.findById(req.params.id);
  if (customer) {
    await customer.remove();
    res.json({ message: "Customer Deleted" });
  }
});

// @desc    Update Customer
// @route   PUT /api/customers/:id
// @access  private/admin
const updateCustomer = asyncHandler(async (req, res) => {
  const customer = await Customer.findById(req.params.id);

  console.log(req.params.id);
  if (customer) {
    customer.fname = req.body.fname || customer.fname;
    customer.lname = req.body.lname || customer.lname;
    customer.contact = req.body.contact || customer.contact;
    customer.email = req.body.email || customer.email;
    if (req.body.password) {
      customer.password = req.body.password;
    }
    customer.department = req.body.department || customer.department;
    customer.project = req.body.project || customer.project;
    customer.isActive = req.body.isActive;

    const updatedCustomer = await customer.save();

    res.json({
      _id: updatedCustomer._id,
      fname: updatedCustomer.fname,
      lname: updatedCustomer.lname,
      contact: updatedCustomer.contact,
      email: updatedCustomer.email,
      department: updatedCustomer.department,

      project: updatedCustomer.project,
      isActive: updatedCustomer.isActive,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// @desc    Get Customer Profile
// @route   GET /api/customers/profile
// @access  private
const getCustomerProfile = asyncHandler(async (req, res) => {
  const customer = await Customer.findById(req.customer._id);

  if (customer) {
    res.json({
      _id: customer._id,
      fname: customer.fname,
      lname: customer.lname,
      email: customer.email,
    });
  } else {
    res.status(404);
    throw new Error("customer not found");
  }
});
// @desc    Update customer profile
// @route   PUT /api/customers/profile
// @access  private
const updateCustomerProfile = asyncHandler(async (req, res) => {
  const customer = await Customer.findById(req.customer._id);
  // console.log(req.customer._id);
  if (customer) {
    customer.fname = req.body.fname || customer.fname;
    customer.lname = req.body.lname || customer.lname;
    customer.email = req.body.email || customer.email;
    if (req.body.password) {
      customer.password = req.body.password;
    }

    const updatedcustomer = await customer.save();

    res.json({
      _id: updatedcustomer._id,
      fname: updatedcustomer.fname,
      lname: updatedcustomer.lname,
      email: updatedcustomer.email,
      token: generateToken(updatedcustomer._id),
    });
  } else {
    res.status(404);
    throw new Error("Customer not found!");
  }
});

const sendOtp = asyncHandler(async (req, res) => {
  const { email, token } = req.body;

  const cusutomer = await Customer.findOne({ email: email });

  if (!cusutomer) {
    console.log("true");
    res.status(400); // Bad Request
    throw new Error("Email not Found");
  } else {
    console.log("false");
    const eToken = cusutomer.emailToken;
    if (token == eToken) {
      const mailOptions = {
        from: process.env.EMAIL,
        to: email,
        subject: "Otp for registration is: ",
        html:
          "<h3>OTP for account verification is </h3>" +
          "<h1 style='font-weight:bold;'>" +
          otp +
          "</h1>", // html body
      };
      //  console.log(typeof otp);
      const otpToString = otp.toString();
      const saltRounds = 10;
      const hashOtp = await bcrypt.hash(otpToString, saltRounds);
      const cOtp = await new CustomerOtpVerification({
        customerEmailId: email,
        otp: hashOtp,
        createAt: Date.now(),
        expireAt: Date.now() + 900000,
      });
      await cOtp.save();
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          return console.log(error);
        }
        console.log("Message sent: %s", info.messageId);
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
        // res.render('otp');
        // 201 - Successfully created
        res.status(201).json({
          message: "Successfully Send Otp To your mail",
        });
      });
    } else {
      res.status(400); // Bad Request
      throw new Error("Token is Invalid");
    }
  }

  //   // } else {
  //   //   res.status(400); // Bad Request
  //   //   throw new Error("email and token not match");
  //   // }
  //   //  res.json(otp);
  // } else {
  //
  // }
});

const verifyOtp = asyncHandler(async (req, res) => {
  // console.log(otp);
  //  try {
  const { otp: cotp, token } = req.body;
  const customer = await Customer.findOne({ emailToken: token });
  const cEmail = customer.email;
  // console.log(customer.email);
  //  let otp = req.body;
  // const UserOTOVerificationRecords = await CustomerOtpVerification.find({
  //   email: customer.email,
  // });

  if (!cotp) {
    res.status(400);
    throw new Error({ message: "Empty otp Details are not allowed" });

    //  console.log("Empty otp Details are not allowed");
  } else {
    const UserOTOVerificationRecords = await CustomerOtpVerification.find({
      email: customer.email,
    });

    if (UserOTOVerificationRecords.length <= 0) {
      res.status(400);
      throw new Error("Record d'not exist");
      // res.json({ message: "Record d'not exist" });
    } else {
      //  console.log(UserOTOVerificationRecords[0]);
      const { expireAt } = UserOTOVerificationRecords[0];
      const hashOtp = UserOTOVerificationRecords[0].otp;
      //  console.log(hashOtp);

      if (expireAt < Date.now()) {
        await CustomerOtpVerification.deleteMany({ cEmail });
        res.status(404);
        throw new Error("OTP has Expired, Plz Send again");
      } else {
        const validOTP = await bcrypt.compare(cotp, hashOtp);
        if (!validOTP) {
          res.status(404);
          throw new Error("Invalid Otp Check Inbox");
          //  res.json({ message: "Invalid Otp Check Inbox" });
        } else {
          res.json({ message: "Otp Is Correct" });
          await CustomerOtpVerification.deleteMany({ cEmail });
        }
      }
    }
  }
  //  } catch (error) {
  //   res.status(404);
  //   throw new Error("Wrong Otp");
  // }

  // console.log(otp);
  // const { otp: cotp, token } = req.body;
  // // console.log(token);
  // const customer = await Customer.findOne({ emailToken: token });
  // // console.log(token);
  // console.log(customer);
  // // const dOtp = otp;
  // if (cotp == otp) {
  //   res.json({ message: "You has been successfully registered" });
  //   //  otp = null;
  // } else {
  //   res.status(400); // Bad Request
  //   throw new Error("OTP is Incorrect");
  // }
});

const verifyResendOtp = asyncHandler(async (req, res) => {
  const mailOptions = {
    from: process.env.EMAIL,
    to: email,
    subject: "Otp for registration is: ",
    html:
      "<h3>OTP for account verification is </h3>" +
      "<h1 style='font-weight:bold;'>" +
      otp +
      "</h1>", // html body
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }
    console.log("Message sent: %s", info.messageId);
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    res.render("otp", { msg: "otp has been sent" });
  });
});

const resetPassword = asyncHandler(async (req, res) => {
  const { password, token } = req.body;

  const customer = await Customer.findOne({ emailToken: token });
  // console.log(token);
  if (customer) {
    customer.password = password;

    // customer.save();

    customer.emailToken = null;
    customer.save();

    res.status(201).json({
      message: "Password Reset Successfully",
    });
  } else {
    res.status(404);
    throw new Error("Customer not found!");
  }
});

const resetCustomer = asyncHandler(async (req, res) => {
  const { email } = req.body;
  const customerExists = await Customer.findOne({ email });

  if (customerExists) {
    // 201 - Successfully Find
    customerExists.emailToken = crypto.randomBytes(64).toString("hex");
    const customer = await customerExists.save();

    const mailOptions = {
      from: process.env.EMAIL,
      to: customer.email,
      subject: "Password reset Link",
      html: `<h5> Password reset Link </h5>
          <h4>Please Click on below link to continue....</h4>
            <a href="${process.env.URL}/customer/verify-email?token=${customer.emailToken}">Click Here</a>`,
    };

    // send mail
    transporter.sendMail(mailOptions, function (err, info) {
      if (err) {
        console.log(err);
      } else {
        // console.log(" link send to your gmail account");
        res.json({ message: "Password reset Link send to your Mail" });
      }
    });
  } else {
    res.status(400); // Bad Request
    throw new Error("Invalid customer Data");
  }
});
export {
  registerCustomer,
  authCustomer,
  getCustomers,
  deleteUserCustomer,
  deleteCustomer,
  getCustomerProfile,
  updateCustomerProfile,
  getCustomerById,
  updateCustomer,
  verifiyCustomers,
  sendOtp,
  verifyOtp,
  verifyResendOtp,
  resetPassword,
  resetCustomer,
};
