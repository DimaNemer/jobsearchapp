import mongoose from "mongoose";


const jobSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  location: { type: String, required: true },
  salary: { type: Number },
  experience: { type: String }, // e.g., '1-3 years'
  employmentType: { type: String, enum: ['Full-time', 'Part-time', 'Contract', 'Internship'] },
  employer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  applicants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
}, { timestamps: true });

module.exports = mongoose.model('Job', jobSchema);
