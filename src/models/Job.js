import mongoose from "mongoose";

const JobSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },

    company: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company",
      required: true,
    },

    employer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    logo: {
      type: String, // image URL
      required: true,
    },

    location: { type: String, required: true },

    employmentType: {
      type: String,
      enum: ["Full-time", "Part-time", "Contract", "Internship", "Remote"],
      required: true,
    },

    experienceLevel: {
      type: String,
      enum: ["Junior", "Mid-level", "Senior", "Lead", "Any"],
      default: "Any",
    },
    slug: {
  type: String,
  unique: true,
  required: true,
},


    categories: [String], // free tags

    description: { type: String, required: true },

    responsibilities: [String],
    requirements: [String],

    salary: { type: String }, // optional, flexible

    deadline: Date,

    status: {
      type: String,
      enum: ["active", "draft"],
      default: "active",
    },
  },
  { timestamps: true }
);

export default mongoose.models.Job || mongoose.model("Job", JobSchema);
