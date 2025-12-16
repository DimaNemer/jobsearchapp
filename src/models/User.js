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


// import mongoose from "mongoose";

// const UserSchema = new mongoose.Schema(
//   {
//     resetPasswordToken: String,
// resetPasswordExpires: Date,

//     role: { type: String, enum: ["candidate", "employer"], required: true },
//     fullName: { type: String, required: true },
//     email: { type: String, required: true, unique: true },
//     password: { type: String, required: true },

//     // ✅ ADD THIS
//     company: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "Company",
//       default: null,
//     },
// profile: {
//   firstName: String,
//   lastName: String,
//   dob: String,
//   gender: String,
//   mobile: String,
//   phone: String,
//   country: String,
//   nationality: String,
//   position: String,
//   district: String,
//   address: String,
//   linkedin: String,
//   photo: String,
// },


//   },
//   { timestamps: true }
// );

// export default mongoose.models.User || mongoose.model("User", UserSchema);
import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    resetPasswordToken: String,
    resetPasswordExpires: Date,

    role: { type: String, enum: ["candidate", "employer"], required: true },
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },

    // Employer only
    company: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company",
      default: null,
    },

    // Profile (both candidate & employer)
    profile: {
      firstName: String,
      lastName: String,
      dob: String,
      gender: String,
      mobile: String,
      phone: String,
      country: String,
      nationality: String,
      position: String,
      district: String,
      address: String,
      linkedin: String,
      photo: String,
    },

    // Resume (candidate only)
    resume: {
      resumeFile: String,
      fileName: String,
      currentJobTitle: String,
      yearsOfExperience: String,
      aboutYou: String,
      desiredJobCategory: [String],
      skills: [String],
      education: [
        {
          degree: String,
          field: String,
          university: String,
          startYear: String,
          endYear: String,
        },
      ],
      experience: [
        {
          title: String,
          company: String,
          startYear: String,
          endYear: String,
          description: String,
        },
      ],
      shareCV: { type: Boolean, default: false },
    },
  },
  { timestamps: true }
);

export default mongoose.models.User || mongoose.model("User", UserSchema);