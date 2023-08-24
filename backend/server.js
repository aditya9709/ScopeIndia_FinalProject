const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const cors = require("cors");
const authroute = require("./routes/auth");
const nodemailer = require("nodemailer");
const jsonwebtoken = require("jsonwebtoken");
const url =
  "mongodb+srv://adityamenon7:menon97@cluster0.f77m2e1.mongodb.net/?retryWrites=true&w=majority";
const bcrypt = require("bcrypt");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.get("/", (req, res) => {
  res.status(200).json({
    status: true,
    data: "Hello World",
  });
});

app.use("/auth", authroute);

async function connectToDb() {
  try {
    await mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error(error);
  }
}
connectToDb();

const port = 5000;
app.listen(port, (err) => {
  if (err) throw err;
  console.log("Server listening on port", port);
});
