const express = require("express");
const router = express.Router();

const {
  submitApplication,
  getApplications,
  updateApplicationStatus,
  deleteApplication,
} = require("../controllers/applicationController");

const {
  protect,
} = require("../middleware/authMiddleware");

// Public route for form submission
router.post("/submit", submitApplication);

// Protected route for admins to view applications
router.get("/all", protect, getApplications);

// Protected routes to update and delete
router.patch("/:id/status", protect, updateApplicationStatus);
router.delete("/:id", protect, deleteApplication);

module.exports = router;
