require("dotenv").config();

const express = require("express");
const cors = require("cors");
const connectDB = require("./src/config/db");
const morgan = require("morgan");
const authRoutes = require("./src/routes/authRoutes");
const adminRoutes = require("./src/routes/adminRoutes");
const adminManagementRoutes = require("./src/routes/adminManagementRoutes");
const applicationRoutes = require("./src/routes/applicationRoutes");
const blogRoutes = require("./src/routes/blogRoutes");
const uploadRoutes = require("./src/routes/uploadRoutes");
const assessmentLeadRoutes = require("./src/routes/assessmentLeadRoutes");
const path = require("path");

const app = express();

connectDB();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use("/api/admin", adminRoutes);



app.use("/api/auth", authRoutes);
app.use(
  "/api/admins",
  adminManagementRoutes
);

app.use("/api/applications", applicationRoutes);
app.use("/api/blogs", blogRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/assessment-leads", assessmentLeadRoutes);

// Make the uploads folder accessible statically
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.get("/", (req, res) => {
    res.send("kriti backend API Running");
});


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log("backend is running on port:", PORT);
});