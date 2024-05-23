const express = require("express");
const User = require("../../model/user/User");
const bcrypt = require("bcryptjs");

// Fetch all users
const fetchAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    if (!users) {
      res.status(404).json({ message: "No users found" });
    }
    res.status(200).json({
      success: true,
      user: users,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Register a new user
const addNewUser = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    if (!name || !email || !password) {
      return res.status(400).json({ message: "Please enter all fields" });
    }
    // Find if the email is already existing
    const userExist = await User.findOne({ email: email });
    if (userExist) {
      return res.status(400).json({ message: "User already exists" });
    }
    // Encrypt the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      name: name,
      email: email,
      password: hashedPassword,
    });
    res.status(201).json({
      success: true,
      user: user,
      message: "User created successfully",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update user
const updateUser = async (req, res) => {
  const id = req.params.id;

  const { name, email, password } = req.body;
  try {
    // if (!name || !email || !password) {
    //   return res.status(400).json({ message: "Please enter all fields" });
    // }
    // Find if the email is already existing
    // const userExist = await User.findOne({ email: email });
    // if (userExist) {
    //   return res.status(400).json({ message: "User already exists" });
    // }
    // Encrypt the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.findByIdAndUpdate(id, {
      name: name,
      email: email,
      password: hashedPassword,
    });
    if (!user) {
      throw new Error("User not found");
    }
    res.status(201).json({
      success: true,
      message: "User updated successfully",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete user
const deleteUser = async (req, res) => {
  const id = req.params.id;

  try {
    const user = await User.findByIdAndDelete(id);
    if (!user) {
      throw new Error("User not found");
    }
    res.status(201).json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Login user
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return res.status(400).json({ message: "Please enter all fields" });
    }
    // Find if the email is already existing
    const userExist = await User.findOne({ email: email });
    if (!userExist) {
      return res.status(400).json({ message: "User does not exist" });
    }
    // Encrypt the password
    const comparePassword = await bcrypt.compare(password, userExist.password);
    if (!comparePassword) {
      throw new Error("Password does not match");
    }

    res.status(200).json({
      success: true,
      message: "User logged in successfully",
      user: userExist,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { fetchAllUsers, addNewUser, updateUser, deleteUser, loginUser };
