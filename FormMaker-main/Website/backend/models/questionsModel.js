import mongoose from "mongoose";

const questionDataSchema = mongoose.Schema({
  question: { type: String },
  areaofaudit: { type: String },
  description: { type: String },
  expectedProofs: { type: String },
  resultAndObservation: { type: String },
  auditorRating: { type: String },
  recomendation: { type: String },
  threat: { type: String },
  proof: { type: String },
});

const questionSchema = mongoose.Schema(
  {
    header: { type: String, default: "" },
    standardId: { type: mongoose.Schema.Types.ObjectId, ref: "Standard" },
    standard: { type: String },
    subHeader1: { type: String, default: "" },
    subHeader2: { type: String, default: "" },
    subHeader3: { type: String, default: "" },
    subHeader4: { type: String, default: "" },
    subHeader5: { type: String, default: "" },
    questions: {
      question: { type: String, default: "" },
      areaofaudit: { type: String, default: "" },
      description: { type: String, default: "" },
      expectedProofs: { type: String, default: "" },
      resultAndObservation: { type: String, default: "" },
      auditorRating: { type: String, default: "" },
      recomendation: { type: String, default: "" },
      threat: { type: String, default: "" },
      proof: { type: String, default: "" },
    },
  },
  { timestamps: true }
);

const Questions = mongoose.model("Questions", questionSchema);

export default Questions;
