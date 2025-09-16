const validator = require("validator");
const validateSignupData = (req, res, next) => {
  const { firstName, lastName, emailId, password } = req.body;
  if (
    !firstName ||
    firstName.trim() === "" ||
    firstName.length < 2 ||
    firstName.length > 50
  ) {
    return {
      valid: false,
      message:
        "First name is required and should be between 2 to 50 characters.",
    };
  }
  if (
    !lastName ||
    lastName.trim() === "" ||
    lastName.length < 2 ||
    lastName.length > 50
  ) {
    return {
      valid: false,
      message:
        "Last name is required and should be between 2 to 50 characters.",
    };
  }
  if (!emailId || emailId.trim() === "" || !validator.isEmail(emailId)) {
    return { valid: false, message: "A valid email is required." };
  }
  if (
    !password ||
    password.length < 8 ||
    !validator.isStrongPassword(password, { minSymbols: 0 })
  ) {
    return {
      valid: false,
      message:
        "Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, and one number.",
    };
  }
  return { valid: true };
};
const validateEditProfileData = (req, res, next) => {
  try {
    const body = req.body;
    
    const allowedUpdates = [
      "firstName",
      "lastName",
      "age",
      "gender",
      "photoUrl",
      "about",
      "skills",
    ];
    const updates = Object.keys(body);
   
    const isValidOperation = updates.every((update) =>
      allowedUpdates.includes(update)
    );
   
    if (!isValidOperation) {
      throw new Error("Invalid updates!");
    }
    return { valid: true };
  } catch (err) {
    return { valid: false, message: err.message };
  }
};
module.exports = { validateSignupData ,validateEditProfileData};
