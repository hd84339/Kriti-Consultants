const express = require("express");

const router = express.Router();

const {
  protect,
  authorize,
} = require("../middleware/authMiddleware");

router.get(
  "/dashboard",
  protect,
  authorize("super-admin"),
  (req, res) => {
    res.json({
      success: true,
      message: "Super Admin Dashboard",
      admin: req.admin,
    });
  }
);

module.exports = router;