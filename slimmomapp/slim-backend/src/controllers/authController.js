const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const Session = require("../models/Session");
require("dotenv").config();

// Helper function for creating JWT token
const createToken = (userId, role, secret, expiresIn) => {
  return jwt.sign({ userId, role }, secret, { expiresIn });
};

// Register user
const register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // Validate input fields
    if (!name || !email || !password || !role) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already in use" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const user = new User({ name, email, password: hashedPassword, role });
    await user.save();

    // Generate token
    const token = createToken(
      user._id,
      user.role,
      process.env.JWT_SECRET,
      "1h"
    );

    res.cookie("token", token, { httpOnly: true, sameSite: "strict" });
    res.status(201).json({
      token,
      user: { name: user.name, email: user.email, role: user.role },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Login user
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Generate access token and refresh token
    const accessToken = createToken(
      user._id,
      user.role,
      process.env.JWT_SECRET,
      "1h"
    );
    const refreshToken = createToken(
      user._id,
      user.role,
      process.env.REFRESH_TOKEN_SECRET,
      "7d"
    );

    // Save refresh token in session
    await new Session({ userId: user._id, refreshToken }).save();

    res.cookie("token", accessToken, { httpOnly: true, sameSite: "strict" });
    res.json({
      accessToken,
      refreshToken,
      user: { name: user.name, email: user.email, role: user.role },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Logout user
const logout = async (req, res) => {
  try {
    // Delete refresh token from session
    await Session.deleteOne({ userId: req.user.userId });
    res.clearCookie("token");
    res.json({ message: "Logged out successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Refresh access token using refresh token
const refreshToken = async (req, res) => {
  try {
    const { refreshToken } = req.body;

    // Check if refresh token is provided
    if (!refreshToken) {
      return res.status(401).json({ message: "No refresh token provided" });
    }

    // Check if the session exists with the provided refresh token
    const session = await Session.findOne({ refreshToken });
    if (!session) {
      return res.status(403).json({ message: "Invalid refresh token" });
    }

    // Verify the refresh token
    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);

    // Generate a new access token
    const newAccessToken = createToken(
      decoded.userId,
      decoded.role,
      process.env.JWT_SECRET,
      "1h"
    );

    res.json({ accessToken: newAccessToken });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  register,
  login,
  logout,
  refreshToken,
};
