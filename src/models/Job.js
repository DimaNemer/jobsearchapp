import mongoose from "mongoose";

const JobSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },

    slug: {
      type: String,
      required: true,
      unique: true,
    },

    location: String,
    employmentType: String,
    experienceLevel: String,

    categories: [String],
    description: String,
    responsibilities: [String],
    requirements: [String],

    salary: String,
    logo: String,

    status: {
      type: String,
      enum: ["active", "closed"],
      default: "active",
    },

    employer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    company: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company",
      required: true,
    },
  },
  { timestamps: true }
);

// 🔥 AUTO-GENERATE SLUG
JobSchema.pre("validate", function () {
  if (!this.slug && this.title) {
    this.slug =
      this.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "") +
      "-" +
      Math.random().toString(36).substring(2, 7);
  }
});


export default mongoose.models.Job || mongoose.model("Job", JobSchema);
