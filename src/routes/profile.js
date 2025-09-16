const express = require("express");
const router = express.Router();
const { userAuth } = require("../middlewares/auth");
const { validateEditProfileData } = require("../utils/validations");
const { User } = require("../models/user");
// router.get("/", userAuth, async (req, res) => {
//   res.send("welcome to profile page");
// });
router.get("/view", userAuth, async (req, res) => {
  const id = req.user._id;
  try {
    const users = await User.findById(id);
    if (users.length === 0) {
      throw new Error("No users found");
    }
    console.log(users);
    res.send(users);
  } catch (err) {
    return res.status(500).send("Error : " + err.message);
  }
});

router.delete("/delete", userAuth, async (req, res) => {
  const id = req.user._id;
  try {
    const user = await User.findByIdAndDelete(id);
    if (!user) {
      throw new Error("No user found");
    }
    console.log(user);
    res.status(200).send("User deleted successfully");
  } catch (err) {
    return res.status(500).send("Error : " + err.message);
  }
});
router.patch("/edit", userAuth, async (req, res) => {
   console.log("PATCH request received!");
   console.log("Headers:", req.headers);
   console.log("Body:", req.body);
  const id = req.user._id;
  const body = req.body;

  try {
    const { valid, message } = validateEditProfileData(req);
    if (!valid) {
      return res.status(400).send(message);
    }
    const user = await User.findByIdAndUpdate(id, body, {
      runValidators: true,
    });
    if (!user) {
      return res.status(404).send("No user found");
    }
    res.json({
      message: `${user.firstName} , your updated successfully`,
      data: user,
    });
  } catch (err) {
    return res.status(500).send(`Error in updating user[${err.message}]`);
  }
});
module.exports = router;
