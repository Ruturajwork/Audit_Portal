import asyncHandler from "express-async-handler";
import CreateProject from "../models/createNewProjectModel.js";
import User from "../models/userModel.js";
import Questions from "../models/questionsModel.js";
import { Role, Department, Standard } from "../models/dataModel.js";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

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

// @desc    Create New Order
// @route   POST /api/project
// @access  private
const createProject = asyncHandler(async (req, res) => {
  const {
    startsDate,
    endsDate,
    standard,
    projectName,
    status,
    description,
    users,
    customers,
    proof,
  } = req.body;
  //  console.log(users._id, customers);
  const standId = await Standard.findOne({ standard });
  if (standId) {
    const questions = await Questions.find({ standard });
    // res.json({ id: standId.id });
    console.log(questions); // Bad Request

    // if (user  s) {
    //   users.map((user) => {
    //     console.log(user);
    //     const data =
    //      await CreateProject.findById(user

    //   });
    // }
    const projectCreate = CreateProject.create({
      projectName,
      standardId: standId._id,
      startsDate,
      endsDate,
      standard,
      description,
      version1: questions,
      status,
      users: users,
      customers: customers,
      logo: proof,
    });

    let emails = []; // "ruturaj.s@audixindia.in";

    // Use forEach to loop through each user object in the array of userss
    customers.forEach((user) => {
      const email = user.email;
      const emailRegex = /\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/i;

      // Check if the email is valid using a regular expression
      if (emailRegex.test(email)) {
        emails.push(email);
      }
    });
    users.forEach((user) => {
      const email = user.email;
      const emailRegex = /\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/i;

      // Check if the email is valid using a regular expression
      if (emailRegex.test(email)) {
        emails.push(email);
      }
    });

    console.log(emails);

    // if (projectCreate) {
    //   const createdOrder = await projectCreate.save();
    //   res.status(201).json(createdOrder);
    // } else {
    //   res.status(400); // Bad Request
    //   throw new Error("Invalid user data");
    // }
    if (projectCreate) {
      // 201 - Successfully created
      res.status(201).json({
        message: "Successfully created",
      });
      const mailOptions = {
        from: process.env.EMAIL,
        to: emails,
        subject: "Welcome Audix",
        html: `<h3> Please Login to Audic Portal! & check your Projects</h3><br/><h5>Project Name is ${projectName}</h5>`,
      };
      // send mail
      transporter.sendMail(mailOptions, function (err, info) {
        if (err) {
          console.log(err);
        } else {
          console.log(" Message send to your gmail account");
        }
      });
    } else {
      res.status(400); // Bad Request
      throw new Error("Invalid Project data");
    }
  }
});

// @desc    Get all Projects
// @route   GET /api/project
// @access  private/admin
const getAllProjects = asyncHandler(async (req, res) => {
  const projects = await CreateProject.find({})
    .populate("customers", "email name")
    .populate("users", "email name");
  res.json(projects);
});

// @desc Delete a Project
// @route DELETE /api/project/:id
// @Access private/admin
const deleteProject = asyncHandler(async (req, res) => {
  const data = await CreateProject.findById(req.params.id);

  if (data) {
    await data.remove();
    res.json({ message: "Project Deleted" });
  } else {
    res.status(404);
    throw new Error("Project not Found");
  }
});

// @desc  Get project Details by ID
// @route GET /api/project/:id
// @acess private/admin
const getProjectById = asyncHandler(async (req, res) => {
  const project = await CreateProject.findById(req.params.id)
    .populate("customers", "email name")
    .populate("users", "email fname");
  //  .populate("users", "email name");;
  // findByIdDemo //
  //  .find({ _id: req.params.id });
  // .populate("customers", "email name")
  //  .populate("users", "email name");
  // project.version1.forEach((que) => {
  //   console.log(que._id);
  // });
  // project.version1.map((que, index) => () => {
  //   console.log(`${index + 1} ${que.header}`);
  // });

  if (project) {
    // project.map((ele) => headers.push(ele.header));

    // headers.forEach((element) => {
    //   if (!mainHeader.includes(element)) {
    //     mainHeader.push(element);
    //   }
    // });

    res.json(project);
  } else {
    res.status(404);
    throw new Error("Project Not Found");
  }
});

// @desc PUT Update Project
// @route PUT api/project/:id
// @access private/admin
const updateProject = asyncHandler(async (req, res) => {
  const project = await CreateProject.findById(req.params.id).populate(
    "users",
    "email name"
  );

  if (project) {
    project.projectName = req.body.projectName || project.projectName;
    project.standard = req.body.standard || project.standard;
    project.startsDate = req.body.startsDate || project.startsDate;
    project.status = req.body.status || project.status;
    project.endsDate = req.body.endsDate || project.endsDate;
    project.users = req.body.users || project.users;
    project.description = req.body.description || project.description;
    project.customers = req.body.customers || project.customers;
    if (req.body.proof) {
      project.logo = req.body.proof;
    }

    const updatedProject = await project.save();
    res.json({
      _id: updatedProject._id,
      projectName: updatedProject.projectName,
      standard: updatedProject.standard,
      startsDate: updatedProject.startsDate,
      status: updatedProject.status,
      endsDate: updatedProject.endsDate,
      users: updatedProject.users,
      description: updatedProject.description,
      customers: updatedProject.customers,
      logo: updatedProject.proof,
    });
  } else {
    res.status(404);
    throw new Error("project not found");
  }
});

// @desc    Get logged in user's Project
// @route   GET /api/project/myprojects
// @access  private
const getMyProjects = asyncHandler(async (req, res) => {
  const projects = await CreateProject.find({
    users: req.user._id,
    //  customers: req.customer._id,
  });
  res.json(projects);
});

const getMyCustProjects = asyncHandler(async (req, res) => {
  const projects = await CreateProject.find({
    // users: req.user._id,
    customers: req.customer._id,
  });
  res.json(projects);
});

const getProjectDById = asyncHandler(async (req, res) => {
  const { questionId, index } = req.body;
  const project = await CreateProject.findById(req.params.id)
    .populate("customers", "email name")
    .populate("users", "email name");

  console.log(project.version1[index]);
  if (project) {
    res.json(project);
    // console.log(project.version1[index]);
  } else {
    res.status(404);
    throw new Error("Project Not Found");
  }
});

const projectEditaQuestion = asyncHandler(async (req, res) => {
  const { index, resultAndObservation, questionId, auditorRating, proof } =
    req.body;

  const project = await CreateProject.findById(req.params.id);

  const data = project.version1; //[index].questions;
  if (project) {
    // const index = index;
    const query = { index: index };
    const update = {
      $set: {
        questions: {
          resultAndObservation: resultAndObservation,
          auditorRating: auditorRating,
          //  recomendation: recomendation,
        },
      },
    };
    data.updateOne(query, update, function (err, result) {
      if (err) throw err;
      console.log(result);
    });

    //  await project.save();
    res.json({ message: "Successfully created" });
  } else {
    res.status(404);
    throw new Error("Question not found");
  }
});

{
  /*This Controller for editing a version1 Questions    */
}
const projectEditQuestion = asyncHandler(async (req, res) => {
  const {
    versionState,
    resultAndObservation,
    auditorRating,
    recomendation,
    projectId,
    proof,
  } = req.body;
  const index = +versionState;
  const id = req.params.id;
  console.log(id);
  CreateProject.updateOne(
    { _id: id },
    {
      $set: {
        [`version1.${index}.questions.resultAndObservation`]:
          resultAndObservation,
        [`version1.${index}.questions.auditorRating`]: auditorRating,
        [`version1.${index}.questions.recomendation`]: recomendation,
        [`version1.${index}.questions.proof`]: proof,
        // "version1.[0].questions.resultAndObservation": resultAndObservation
      },
    },
    { new: true },
    function (err, data) {
      if (err) throw err;
      // res.send({ message: "Success" });
      res.json(data);
    }
  );
});

const projectEditVersion2Question = asyncHandler(async (req, res) => {
  const {
    versionState,
    resultAndObservation,
    auditorRating,
    recomendation,
    version,
    proof,
  } = req.body;
  const index = +versionState;
  const id = req.params.id;
  console.log(id);
  CreateProject.updateOne(
    { _id: id },
    {
      $set: {
        [`version2.${index}.questions.resultAndObservation`]:
          resultAndObservation,
        [`version2.${index}.questions.auditorRating`]: auditorRating,
        [`version2.${index}.questions.recomendation`]: recomendation,
        [`version2.${index}.questions.proof`]: proof,
        // "version1.[0].questions.resultAndObservation": resultAndObservation
      },
    },
    { new: true },
    function (err, data) {
      if (err) throw err;
      // res.send({ message: "Success" });
      res.json(data);
    }
  );
});

const projectEditVersion3Question = asyncHandler(async (req, res) => {
  const {
    versionState,
    resultAndObservation,
    auditorRating,
    recomendation,
    version,
    proof,
  } = req.body;
  const index = +versionState;
  const id = req.params.id;
  console.log(id);
  CreateProject.updateOne(
    { _id: id },
    {
      $set: {
        [`version3.${index}.questions.resultAndObservation`]:
          resultAndObservation,
        [`version3.${index}.questions.auditorRating`]: auditorRating,
        [`version3.${index}.questions.recomendation`]: recomendation,
        [`version3.${index}.questions.proof`]: proof,
        // "version1.[0].questions.resultAndObservation": resultAndObservation
      },
    },
    { new: true },
    function (err, data) {
      if (err) throw err;
      // res.send({ message: "Success" });
      res.json(data);
    }
  );
});

const copyToVersion2 = asyncHandler(async (req, res) => {
  // const {} = req.body;

  const project = await CreateProject.findById(req.params.id);

  if (project) {
    const data = project.version1;
    // console.log(data);
    project.version2 = data;
    await project.save();
    res.json({ project });
  } else {
    res.status(404);
    throw new Error("Version1 Not Found");
  }
});

const copyToVersion3 = asyncHandler(async (req, res) => {
  // const {} = req.body;

  const project = await CreateProject.findById(req.params.id);

  if (project) {
    const data = project.version2;
    // console.log(data);
    project.version3 = data;
    await project.save();
    res.json({ project });
  } else {
    res.status(404);
    throw new Error("Version2 Not Found");
  }
});

// const getProjectQById = asyncHandler(async (req, res) => {
//   const project = await CreateProject.findById(req.params.id)
//     .populate("customers", "email name")
//     .populate("users", "email name");

//   if (project) {
//     res.json(project);
//   } else {
//     res.status(404);
//     throw new Error("Project Not Found");
//   }
// });
export {
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
  copyToVersion3,
  projectEditVersion3Question,
  projectEditVersion2Question,
  //  getProjectQById
};

// const id = req.params.id;
//   const project = CreateProject.findById(id)

//   const data = project.version1[index].questions
//   console.log(data);

//   CreateProject.findOneAndUpdate(
//     data,
//     {
//       // $set : {
//       //   version1: [{
//       //     questions: {
//       //       resultAndObservation: resultAndObservation,
//       //       auditorRating: auditorRating,
//       //       recomendation: recomendation,
//       //     },
//       // }],
//       // },

//     // {
//        $push: {resultAndObservation: resultAndObservation},
//      },
//        { new : true },
//     function (err, data) {
//       if (err) throw err;
//       // res.send({ message: "Success" });
//       res.json(data);
//     }
//   );
