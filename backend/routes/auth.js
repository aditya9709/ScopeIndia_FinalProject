const router = require("express").Router();
const multer = require("multer");
const path = require("path");
const UserModel = require("../models/user");
const mailsender = require("../common/mail");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    cb(null, Date.now() + ext);
  },
});

const upload = multer({ storage: storage });

router.post("/register", upload.single("picture"), async (req, res) => {
  try {
    const existingUser = await UserModel.findOne({ email: req.body.email });

    if (existingUser) {
      return res.json({
        success: false,
        message: "User already exists",
      });
    }

    const temporaryPassword = Math.random().toString(36).substring(7);

    const newUser = new UserModel({
      username: req.body.username,
      fullName: req.body.fullName,
      phoneNumber: req.body.phoneNumber,
      country: req.body.country,
      state: req.body.state,
      city: req.body.city,
      password: temporaryPassword,
      picture: req.file ? req.file.path : null,
    });

    await newUser.save();

    mailsender(
      req.body.email,
      "Welcome message",
      req.body.fullName,
      temporaryPassword
    );

    return res.json({
      success: true,
      message: "Successfully registered",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Error registering user",
    });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    // Find the user by their username
    const user = await UserModel.findOne({ username });

    if (!user) {
      return res.json({
        success: false,
        message: "Invalid username or password",
      });
    }

    const passwordMatch = await user.comparePassword(password);

    if (!passwordMatch) {
      return res.json({
        success: false,
        message: "Invalid username or password",
      });
    }

    const token = jwt.sign(
      { userId: user._id },
      "184f235ed3d6a449480ee3e22ea09bd61dc76519e75234a132ce40a1a8ff4963"
    );

    return res.json({
      success: true,
      message: "Login successful",
      token,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Error logging in",
    });
  }
});

router.get("/profile", async (req, res) => {
  try {
    const userId = req.user.userId; // Assuming you're extracting user ID from JWT
    const user = await UserModel.findById(userId);

    if (!user) {
      return res.json({
        success: false,
        message: "User not found",
      });
    }

    // Send user profile data
    return res.json({
      success: true,
      user: {
        username: user.username,
        fullName: user.fullName,
        email: user.email,
        phoneNumber: user.phoneNumber,
        city: user.city,
        state: user.state,
        country: user.country,
        picture: user.picture,
      },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Error fetching user profile",
    });
  }
});

router.put("/update-profile", upload.single("picture"), async (req, res) => {
  try {
    const userId = req.user.userId; // Assuming you're extracting user ID from JWT
    const user = await UserModel.findById(userId);

    if (!user) {
      return res.json({
        success: false,
        message: "User not found",
      });
    }

    // Update user profile data
    user.fullName = req.body.fullName || user.fullName;
    user.phoneNumber = req.body.phoneNumber || user.phoneNumber;
    user.city = req.body.city || user.city;
    user.state = req.body.state || user.state;
    user.country = req.body.country || user.country;

    if (req.file) {
      user.picture = req.file.path;
    }

    await user.save();

    return res.json({
      success: true,
      message: "Profile updated successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Error updating user profile",
    });
  }
});

module.exports = router;
