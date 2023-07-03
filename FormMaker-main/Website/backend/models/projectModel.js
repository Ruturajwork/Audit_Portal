import mongoose from "mongoose";

const headersSchema = mongoose.Schema({
  header: { type: String },
  questions: [questionsSchema],
  subheaders: [subheadersSchema],
});

const subheadersSchema = mongoose.Schema({
  subheader: { type: String },
  subofsubheaders: [subofsubheadersSchema],
});

const subofsubheadersSchema = mongoose.Schema({
  subofsubheader: { type: String },
  questions: [questionsSchema],
  subofsubofsubheaders: [subofsubofsubheadersSchema],
});

const subofsubofsubheadersSchema = mongoose.Schema({
  subofsubofsubheader: { type: String },
  questions: [questionsSchema],
});

const questionsSchema = mongoose.Schema({
  question: { type: String },
  areaofaudit: { type: String },
  description: { type: String },
  resultandobservation: { type: String },
  rating: { type: String },
  recomendation: { type: String },
  threat: { type: String },
  proof: { type: String },
});

const projectSchema = mongoose.Schema({
  //  headers: [headersSchema],
  //  subheaders: [subheadersSchema],
  //  questions: [questionsSchema],
  headers: [headersSchema],
});

const Project = mongoose.model("Project", projectSchema);

export default Project;
