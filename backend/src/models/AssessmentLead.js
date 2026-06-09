const mongoose = require("mongoose");

const assessmentLeadSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    company: {
      type: String,
    },
    revenue: {
      type: Number,
      required: true,
    },
    employees: {
      type: Number,
    },
    stage: {
      type: String,
    },
    industry: {
      type: String,
    },
    overallScore: {
      type: Number,
      required: true,
    },
    leakagePercentage: {
      type: Number,
      required: true,
    },
    annualLeakage: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("AssessmentLead", assessmentLeadSchema);
