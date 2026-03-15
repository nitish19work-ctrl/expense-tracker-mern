const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");

const {
  registerUser,
  loginUser,
  getUserInfo,
} = require("../controllers/authController");

const router = express.Router();

// Register
router.post("/register", registerUser);

// Login
router.post("/login", loginUser);

// Get User
router.get("/getUser", protect, getUserInfo);

// 🔥 Upload Image (Signup time)
router.post(
  "/upload-image",
  upload.single("image"),
  async (req, res) => {
    try {

      if (!req.file) {
        return res.status(400).json({ message: "No file uploaded" });
      }

      const imageUrl = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;

      res.status(200).json({
        message: "Image uploaded successfully",
        imageUrl,
      });

    } catch (err) {
      res.status(500).json({
        message: "Error uploading image",
        error: err.message,
      });
    }
  }
);

// Update Profile Image (Dashboard)
router.put(
  "/update-profile-image",
  protect,
  upload.single("image"),
  async (req, res) => {
    try {

      if (!req.file) {
        return res.status(400).json({ message: "No file uploaded" });
      }

      const User = require("../models/User");
      const user = await User.findById(req.user.id);

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      const imageUrl = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;

      user.profileImageUrl = imageUrl;

      await user.save();

      res.status(200).json({
        message: "Profile image updated successfully",
        profileImageUrl: imageUrl,
      });

    } catch (err) {
      res.status(500).json({
        message: "Error updating profile image",
        error: err.message,
      });
    }
  }
);

module.exports = router;