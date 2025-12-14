import mongoose from "mongoose";

const CompanySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    location: { type: String },
    website: { type: String },
    logo: { type: String }, // base64 or URL (for later)

    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.models.Company ||
  mongoose.model("Company", CompanySchema);
