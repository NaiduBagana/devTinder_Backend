const express = require("express");
const router = express.Router();
const {signupAuth,loginAuth,userAuth} = require("../middlewares/auth");
const {User} = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
require("dotenv").config();
router.use(cookieParser());


router.post("/signup",signupAuth, async (req, res) => {
  try {
    console.log("Request body:", req.body);
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);
    const {firstName, lastName, emailId} = req.body;
    const exisitngUser = await User.findOne({emailId: emailId});
    if(exisitngUser)
       return res.status(400).send("User with this email already exists");
    const user = new User({firstName, lastName, emailId, password: hashedPassword});
    await user.save();
    console.log("User saved:", user);
    // const data = { firstName: user.firstName, lastName: user.lastName, emailId: user.emailId ,_id:user._id};
    res.status(201).json({message: "User registered successfully", user: user});
  } catch (err) {
    console.error("Error in adding user:", err.message); 
    return res.status(500).send(`Error in adding user: ${err.message}`);
  }
});
router.post("/login", loginAuth,async (req, res) => {
  const { emailId, password } = req.body;
  console.log("Login attempt for email:", emailId);
  try {
    const user = await User.findOne({ emailId: emailId  });
    if (!user) {
     return res.status(400).send('Invalid Credentials');
    }
    const isPasswordMatch = user.validatePassword(password);
    if (!isPasswordMatch) {
      return res.status(400).send('Invalid Credentials');
    }
    const token = user.getJwtToken();
    res.cookie("token",token,{expires:new Date(Date.now()+ 7*24*60*60*1000)});
    //const data = { firstName: user.firstName, lastName: user.lastName, emailId: user.emailId ,_id:user._id};
    res.status(200).json({ message: "Login successful", user: user });
  } catch (err) {
    console.error("Error in user login:", err.message); 
    return res.status(500).send(`Error in user login: ${err.message}`);
  }
});
router.post("/logout", userAuth, (req, res) => {
//   res.clearCookie("token");
  res.cookie("token",null,{expires:new Date(Date.now())});
  res.status(200).send("User logged out successfully");
});
module.exports = router;