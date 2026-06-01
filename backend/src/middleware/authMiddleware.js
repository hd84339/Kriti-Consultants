const jwt = require("jsonwebtoken");
const Admin = require("../models/Admin");

const protect = async (req, res, next) => {
  try {
    let token;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];

      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET
      );

      req.admin = await Admin.findById(
        decoded.id
      ).select("-password");

      next();
    } else {
      return res.status(401).json({
        success: false,
        message: "Not authorized",
      });
    }
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Token invalid",
    });
  }
};

const authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.admin.role)) {
      return res.status(403).json({
        success: false,
        message: "Access denied",
      });
    }

    next();
  };
};

module.exports = {
  protect,
};

module.exports = {
  protect,
  authorize,
};