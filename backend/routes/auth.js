const router = require("express").Router();
const UserModel = require("../models/user");
const mailsender = require("../common/mail");
const jwt = require("jsonwebtoken");

router.get("/", (req, res) => {
  res.json({
    success: true,
    message: "auth route is working",
  });
});

router.post("/register", async (req, res) => {
  try {
    const existingUser = await UserModel.findOne({ email: req.body.email });

    if (existingUser) {
      return res.json({
        success: false,
        message: "User already exists",
      });
    }

    const newUser = new UserModel({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      gender: req.body.gender,
      dob: req.body.dob,
      email: req.body.email,
      phoneNumber: req.body.phoneNumber,
      country: req.body.country,
      state: req.body.state,
      city: req.body.city,
      hobbies: req.body.hobbies,
      password: req.body.password,
    });

    await newUser.save();

    const emailSubject = "Welcome to our platform";
    const emailMessage = `Hello ${newUser.firstName} ${newUser.lastName},\n\nWelcome to our platform! We're excited to have you on board.`;
    mailsender(newUser.email, emailSubject, emailMessage);

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

router.post("/login", async (req, res) => {});

router.post("/getProfile", async (req, res) => {});

module.exports = router;
