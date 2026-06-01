const express = require("express");

const router = express.Router();

const {
  createAdmin,
  getAllAdmins,
} = require("../controllers/adminController");

const {
  protect,
  authorize,
} = require("../middleware/authMiddleware");

router.post(
  "/create",
  protect,
  authorize("super-admin"),
  createAdmin
);

router.get(
  "/all",
  protect,
  authorize("super-admin"),
  getAllAdmins
);

module.exports = router;