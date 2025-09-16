const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { JWT_SECRET } = require("../utils/constants");
// if (process.env.NODE_ENV !== "production") require("dotenv").config();
const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "First name is required"],
      trim: true,
      minLength: 2,
      maxLength: 50,
    },
    lastName: {
      type: String,
      required: [true, "Last name is required"],
      trim: true,
      minLength: 2,
      maxLength: 50,
    },
    emailId: {
      type: String,
      required: [true, "Email is required"],
      unique: true, //automatically creates index because of unique
      lowercase: true,
      trim: true,
      validate: {
        validator: function (value) {
          if (!validator.isEmail(value))
            throw new Error("Invalid email format");
          return true;
        },
        message: (props) => `${props.value} is not a valid email!`,
      },
      //match: [/\S+@\S+\.\S+/, "is an invalid email format"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minLength: 8,
      validate: {
        validator: function (value) {
          if (!validator.isStrongPassword(value, { minSymbols: 0 }))
            throw new Error(
              "Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, and one number."
            );
          return true;
        },
        message: (props) => `Password is not strong enough!`,
      },
    },
    age: {
      type: Number,
      //required: true,
      min: 18,
      max: 120,
    },
    gender: {
      type: String,
      //required: true,
      enum: {
        values: ["male", "female", "other", "prefer not to say"],
        message: `{VALUE} is not supported`,
      },
    },

    photoUrl: {
      type: String,
      default: "https://www.gravatar.com/avatar/?d=mp",
      trim: true,
      validate: {
        validator: function (value) {
          if (!validator.isURL(value)) throw new Error("Invalid URL format");
          return true;
        },
        message: (props) => `${props.value} is not a valid URL!`,
      },
    },
    about: {
      type: String,
      default: "Hey there! I am using DevTinder 🚀",
      trim: true,
      maxLength: 200,
    },
    skills: {
      type: [String], // Array of strings
      validate: {
        validator: function (arr) {
          return arr.length <= 10; // limit number of skills
        },
        message: "You can add up to 10 skills only",
      },
      default: [], // If no skills are provided
    },
    resetPasswordOtp: { type: String },
    resetPasswordExpiry: { type: Date },
  },

  { timestamps: true }
);
userSchema.index({ firstName: 1, lastName: 1 }); //compound index for searching users by name
userSchema.methods.validatePassword = async function (password) {
  const user = this;
  const isPasswordValid = bcrypt.compare(password, user.password);
  return isPasswordValid;
};
userSchema.methods.getJwtToken = function () {
  return jwt.sign({ _id: this._id }, JWT_SECRET, {
    expiresIn: "7d",
  });
};

const User = mongoose.model("User", userSchema);

module.exports = { User };
