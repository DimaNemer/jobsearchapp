// import mongoose from "mongoose";

// const UserSchema = new mongoose.Schema(
//   {
//     role: {
//       type: String,
//       enum: ["candidate", "employer", "admin"],
//       required: true,
//     },
//     fullName: { type: String, required: true },
//     email: { type: String, required: true, unique: true },
//     password: { type: String, required: true },

//     // Employer only
//     company: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "Company",
//     },
//   },
//   { timestamps: true }
// );

// export default mongoose.models.User || mongoose.model("User", UserSchema);


import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    role: { type: String, enum: ["candidate", "employer"], required: true },
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },

    // ✅ ADD THIS
    company: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company",
      default: null,
    },
  },
  { timestamps: true }
);

export default mongoose.models.User || mongoose.model("User", UserSchema);
