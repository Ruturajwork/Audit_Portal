import mongoose from "mongoose";

const createProjectSchems = mongoose.Schema({
  projectName: {
    type: String,
  },
  standardId: { type: mongoose.Schema.Types.ObjectId, ref: "Standard" },
  standard: {
    type: String,
  },
  startsDate: {
    type: Date,
  },
  endsDate: {
    type: Date,
  },
  status: {
    type: String,
  },
  description: {
    type: String,
  },
  version1: {
    type: Array,
  },
  version2: {
    type: Array,
  },
  version3: {
    type: Array,
  },

  users: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      // required: true,
    },
  ],
  customers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Customer",
      // required: true,
    },
  ],
  customerComments: [
    {
      name: {
        type: String,
      },

      comment: {
        type: String,
      },
      customer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Customer",
      },
    },
    { timestamps: true },
  ],
  auditorComments: [
    {
      name: {
        type: String,
      },

      comment: {
        type: String,
      },
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    },
    { timestamps: true },
  ],
  customerApproved: {
    type: Boolean,
    default: false,
  },
  userApproved: {
    type: Boolean,
    default: false,
  },
  logo: { type: String },
});

const CreateProject = mongoose.model("CreateProject", createProjectSchems);

export default CreateProject;
