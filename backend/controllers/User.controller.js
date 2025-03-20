const userModel = require("../models/User.model");
const bcrypt = require("bcryptjs");
const { json } = require("express");
const jwt = require("jsonwebtoken");

class User {
  // register controller
  static registerUser = async (req, res) => {
    try {
      const { username, email, password, confirmPassword } = req.body;
      const user = await userModel.findOne({ email });

      if (user) return res.status(400).json({ message: "User already exists" });
      else if (!username)
        return res.status(401).json({ message: "username is required" });
      else if (!email)
        return res.status(401).json({ message: "email is required" });
      else if (!email.includes("@") || !email.includes("."))
        return res.status(401).json({ message: "Invalid email address" });
      else if (password.length < 6)
        return res
          .status(401)
          .json({ message: "Password must be 6 characters" });
      else if (password !== confirmPassword)
        return res.status(401).json({ message: "Passwords do not match" });

      const hash = await bcrypt.hash(password, 10);
      const newUser = new userModel({ username, email, password: hash });

      await newUser.save();

      const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);

      delete newUser._doc.password;

      res.cookie('token', token)
      console.log(res.cookies)
      res.status(201).cookie("token", token).json({ token, user:newUser });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  // login controller
  static loginUser = async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await userModel.findOne({ email });

      if (!user) return res.status(400).json({ message: "Invalid email" });
      else if (password.length < 6)
        return res
          .status(401)
          .json({ message: "password must be 6 characters" });

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch)
        return res.status(400).json({ message: "Invalid password" });
      

      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

      delete user._doc.password;

      res.status(200).cookie("token", token).json({ token, user });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  // logout handler 
  static logoutUser = (req, res) => {
    res.clearCookie("token");
    res.json({ message: "Logged out successfully" });
  };


  // assign super admin 
  static assignSuperAdmin = async (req, res) => {
    try {
      const { userId } = req.body;
      if (!userId) return res.status(400).json({ message: "userId is required" });

      const user = jwt.verify(userId,process.env.JWT_SECRET)
      if (!user) return res.status(403).json({ message: "Invalid user" });
      
        await userModel.findByIdAndUpdate(user.id, { role: "superAdmin" });
        res.status(200).json({ message: "Super admin assigned successfully" });
      
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}

module.exports = User;
