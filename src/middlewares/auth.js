const { validateSignupData } = require("../utils/validations");
const jwt = require("jsonwebtoken");
const { User } = require("../models/user");
const bcrypt = require("bcrypt");
const userAuth = async (req, res, next) => {
  const token = req.cookies.token;
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const { _id } = decoded;
    const user = await User.findById(_id);

    req.user = user;
    req.user._id = _id;
    if (!user) throw new Error("Not authorized");
    next();
  } catch (err) {
    return res
      .status(401)
      .send("Not authorized ! Please Login ERROR: ", err.message);
  }
};
const signupAuth = (req, res, next) => {
  const { valid, message } = validateSignupData(req);
  if (!valid) {
    return res.status(400).send(message);
  }
  next();
};
const loginAuth = (req, res, next) => {
  if (!req.body.emailId || !req.body.password) {
    res.status(400).send("emailId and password are required");
  } else {
    next();
  }
};

module.exports = { userAuth, signupAuth, loginAuth };
