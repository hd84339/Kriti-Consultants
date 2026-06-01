const Application = require("../models/Application");

const submitApplication = async (req, res) => {
  try {
    const { name, designation, mobile, company, industry, teamSize, revenue, bottleneck } = req.body;

    const application = await Application.create({
      name,
      designation,
      mobile,
      company,
      industry,
      teamSize,
      revenue,
      bottleneck
    });

    res.status(201).json({
      success: true,
      message: "Application submitted successfully",
      application,
    });
  } catch (error) {
    console.error("Error submitting application:", error);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

const getApplications = async (req, res) => {
  try {
    const applications = await Application.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: applications.length,
      applications,
    });
  } catch (error) {
    console.error("Error fetching applications:", error);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

const updateApplicationStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const application = await Application.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    );

    if (!application) {
      return res.status(404).json({ success: false, message: "Application not found" });
    }

    res.status(200).json({ success: true, application });
  } catch (error) {
    console.error("Error updating application status:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

const deleteApplication = async (req, res) => {
  try {
    const application = await Application.findByIdAndDelete(req.params.id);

    if (!application) {
      return res.status(404).json({ success: false, message: "Application not found" });
    }

    res.status(200).json({ success: true, message: "Application deleted successfully" });
  } catch (error) {
    console.error("Error deleting application:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

module.exports = {
  submitApplication,
  getApplications,
  updateApplicationStatus,
  deleteApplication,
};
