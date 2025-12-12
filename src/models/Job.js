import mongoose from "mongoose";

const JobSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    company: { type: String, required: true },
    location: { type: String, required: true },
    salary: { type: String },
    image: { type: String },
    description: { type: String },
    skills: { type: [String], default: [] },
    employer: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // <-- added
  },
  { timestamps: true }
);

export default mongoose.models.Job || mongoose.model("Job", JobSchema);