const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');

// Configure multer storage
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    // Save to the backend/uploads folder
    cb(null, 'uploads/');
  },
  filename: function(req, file, cb) {
    // Generate a unique filename: fieldname-timestamp.ext
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

// Check file type (optional but recommended)
function checkFileType(file, cb) {
  const filetypes = /jpg|jpeg|png|webp|gif/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb(new Error('Images only! (jpg, jpeg, png, webp, gif)'));
  }
}

const upload = multer({
  storage,
  limits: { fileSize: 5000000 }, // 5MB limit
  fileFilter: function(req, file, cb) {
    checkFileType(file, cb);
  }
});

// @route   POST /api/upload
// @desc    Upload an image and return the static URL
// @access  Public/Admin (Add auth middleware here if needed)
router.post('/', upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ success: false, message: 'No file uploaded' });
  }

  // Generate the URL that the frontend will use to access the image
  // Since we serve /uploads statically, the URL path is /uploads/filename
  const imageUrl = `/uploads/${req.file.filename}`;

  res.status(200).json({
    success: true,
    url: imageUrl,
    message: 'Image uploaded successfully'
  });
});

module.exports = router;
