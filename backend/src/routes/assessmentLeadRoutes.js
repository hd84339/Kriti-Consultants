const express = require("express");
const router = express.Router();
const {
  createAssessmentLead,
  getAllAssessmentLeads,
  deleteAssessmentLead,
} = require("../controllers/assessmentLeadController");
const { protect } = require("../middleware/authMiddleware");

// Public route to submit lead
router.post("/", createAssessmentLead);

// Protected route for admin to view leads
router.get("/", protect, getAllAssessmentLeads);

// Protected route for admin to delete lead
router.delete("/:id", protect, deleteAssessmentLead);

module.exports = router;
