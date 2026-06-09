const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
require("dotenv").config();

const connectDB = require("../config/db");
const Admin = require("../models/Admin");

const createSuperAdmin = async () => {
  try {
    await connectDB();

    const superAdminEmailsString = process.env.SUPERADMIN_EMAIL || "admin@kriti.com";
    const superAdminPassword = process.env.SUPERADMIN_PASSWORD || "Admin@123";

    const emails = superAdminEmailsString.split(",").map(e => e.trim());

    for (const email of emails) {
      const existingAdmin = await Admin.findOne({
        email: email,
      });

      if (existingAdmin) {
        console.log(`Super Admin already exists: ${email}`);
        continue;
      }

      const hashedPassword = await bcrypt.hash(
        superAdminPassword,
        10
      );

      const admin = await Admin.create({
        name: "Super Admin",
        email: email,
        password: hashedPassword,
        role: "super-admin",
      });

      console.log(`Super Admin Created: ${admin.email}`);
    }

    process.exit();
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

createSuperAdmin();
