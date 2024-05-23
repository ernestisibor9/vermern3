const express = require("express");
const bcrypt = require("bcryptjs");
const Admin = require("../../model/admin/Admin");
const jwt = require("jsonwebtoken");
const Movie = require("../../model/movie/Movie");

const addAdmin = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(400).json({ message: "Please enter all fields" });
    }
    // Find if the email is already existing
    const adminExist = await Admin.findOne({ email: email });
    if (adminExist) {
      return res.status(400).json({ message: "admin already exists" });
    }
    // Encrypt the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const admin = await Admin.create({
      email: email,
      password: hashedPassword,
    });
    res.status(201).json({
      success: true,
      admin: admin,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Login admin
const loginAdmin = async (req, res) => {
  const { email, password } = req.body;
  try {
    // if (!email || !password) {
    //   return res.status(400).json({ message: "Please enter all fields" });
    // }
    // Find if the email is already existing
    const adminExist = await Admin.findOne({ email: email });
    if (!adminExist) {
      return res.status(400).json({ message: "admin does not exist" });
    }
    // Encrypt the password
    const comparePassword = await bcrypt.compare(password, adminExist.password);
    if (!comparePassword) {
      throw new Error("Password does not match");
    }
    // Generate token
    const token = jwt.sign({ id: adminExist._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    res.status(200).json({
      success: true,
      message: "admin logged in successfully",
      admin: adminExist,
      token: token,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Fetch all Admin
const getAllAdmin = async (req, res) => {
  try {
    const fetchAllAdmin = await Admin.find().populate("addedMovie");
    fetchAllAdmin.forEach((fetchAllAdmin2) => {
      console.log(fetchAllAdmin2.addedMovie);
    });
    if (!fetchAllAdmin) {
      res.status(404).json({ message: "No admin found" });
    }
    res.status(200).json({
      success: true,
      message: "Admin successfully found",
      admin: fetchAllAdmin,
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

// Fetch single admin
const singleAdmin = async (req, res) => {
  const id = req.params.id;
  try {
    const admin = await Admin.findById(id).populate("addedMovie");
    if (!admin) {
      throw new Error("Admin not found");
    }
    return res.status(200).json({
      success: true,
      message: "Admin successfully found",
      admin: admin,
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

module.exports = { addAdmin, loginAdmin, getAllAdmin, singleAdmin };
