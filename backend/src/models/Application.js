const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please add a name"],
    },
    designation: {
      type: String,
      required: [true, "Please add a designation"],
    },
    mobile: {
      type: String,
      required: [true, "Please add a mobile number"],
    },
    company: {
      type: String,
      required: [true, "Please add a company name"],
    },
    industry: {
      type: String,
      required: [true, "Please add an industry"],
    },
    teamSize: {
      type: String,
      required: [true, "Please add a team size"],
    },
    revenue: {
      type: String,
      required: [true, "Please add a revenue range"],
    },
    bottleneck: {
      type: String,
      required: [true, "Please add a bottleneck"],
    },
    status: {
      type: String,
      enum: ["New", "In Progress", "Completed", "Rejected"],
      default: "New",
    }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Application", applicationSchema);
