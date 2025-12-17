import mongoose from "mongoose";

const CompanySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    location: { type: String },
    website: { type: String },
    logo: { type: String },

    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

// Prevent model recompilation errors
delete mongoose.models.Company;

const Company = mongoose.model("Company", CompanySchema);

export default Company;