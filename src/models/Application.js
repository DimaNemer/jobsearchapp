import mongoose from "mongoose";

const ApplicationSchema = new mongoose.Schema(
  {
    job: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Job",
      required: true,
    },
    
    candidate: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    
    employer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    
    // Snapshot of candidate data at time of application
    candidateSnapshot: {
      fullName: String,
      email: String,
      profile: mongoose.Schema.Types.Mixed,
      resume: mongoose.Schema.Types.Mixed,
    },
    
    // Snapshot of job data at time of application
    jobSnapshot: {
      title: String,
      company: String,
      location: String,
    },
    
    status: {
      type: String,
      enum: ["pending", "reviewed", "accepted", "rejected"],
      default: "pending",
    },
    
    coverLetter: String,
    
    notes: String, // For employer notes
    
  },
  { timestamps: true }
);

// Index for faster queries
ApplicationSchema.index({ job: 1, candidate: 1 }, { unique: true });
ApplicationSchema.index({ employer: 1 });
ApplicationSchema.index({ candidate: 1 });

// Prevent model recompilation errors
delete mongoose.models.Application;

const Application = mongoose.model("Application", ApplicationSchema);

export default Application;