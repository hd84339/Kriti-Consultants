const AssessmentLead = require("../models/AssessmentLead");

// @desc    Create a new assessment lead
// @route   POST /api/assessment-leads
// @access  Public
const createAssessmentLead = async (req, res) => {
  try {
    const {
      name,
      email,
      phone,
      company,
      revenue,
      employees,
      stage,
      industry,
      overallScore,
      leakagePercentage,
      annualLeakage,
    } = req.body;

    const lead = await AssessmentLead.create({
      name,
      email,
      phone,
      company,
      revenue,
      employees,
      stage,
      industry,
      overallScore,
      leakagePercentage,
      annualLeakage,
    });

    res.status(201).json({
      success: true,
      message: "Assessment lead saved successfully",
      lead,
    });
  } catch (error) {
    console.error("Error creating assessment lead:", error);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// @desc    Get all assessment leads
// @route   GET /api/assessment-leads
// @access  Private/Admin
const getAllAssessmentLeads = async (req, res) => {
  try {
    const leads = await AssessmentLead.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: leads.length,
      leads,
    });
  } catch (error) {
    console.error("Error fetching assessment leads:", error);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// @desc    Delete an assessment lead
// @route   DELETE /api/assessment-leads/:id
// @access  Private/Admin
const deleteAssessmentLead = async (req, res) => {
  try {
    const lead = await AssessmentLead.findById(req.params.id);

    if (!lead) {
      return res.status(404).json({
        success: false,
        message: "Assessment lead not found",
      });
    }

    await lead.deleteOne();

    res.status(200).json({
      success: true,
      message: "Assessment lead removed",
    });
  } catch (error) {
    console.error("Error deleting assessment lead:", error);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

module.exports = {
  createAssessmentLead,
  getAllAssessmentLeads,
  deleteAssessmentLead,
};
