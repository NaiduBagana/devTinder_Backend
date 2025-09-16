const express = require("express");
const router = express.Router();
const { userAuth } = require("../middlewares/auth");
const { User } = require("../models/user");
const ConnectionRequest = require("../models/connectionRequest");
router.post("/send/:status/:toUserId", userAuth, async (req, res) => {
  try {
    const { status, toUserId } = req.params;
    const fromUserId = req.user._id;

    // if (fromUserId.toString() === toUserId) {
    //   return res
    //     .status(400)
    //     .json({ error: "You cannot send a connection request to yourself." });
    // }

    const toUser = await User.findById(toUserId);
    if (!toUser) {
      return res.status(404).json({
        error: "The user you are trying to connect with does not exist.",
      });
    }

    const existingRequest = await ConnectionRequest.findOne({
      $or: [
        { fromUserId: fromUserId, toUserId: toUserId },
        { fromUserId: toUserId, toUserId: fromUserId },
      ],
    });
    if (existingRequest) {
      return res
        .status(400)
        .json({ error: "A connection request already exists." });
    }
    const allowedStatuses = ["interested", "ignored"];
    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({
        error: `Invalid status. Allowed statuses are: ${allowedStatuses.join(
          ", "
        )}`,
      });
    }

    const newRequest = new ConnectionRequest({
      fromUserId,
      toUserId,
      status,
    });
    const data = await newRequest.save();
    res
      .status(201)
      .json({ message: "Connection request sent successfully.", data: data });
  } catch (error) {
    console.error("Error sending connection request:", error);
    res.status(500).json({ error: error.message || "Internal server error." });
  }
});
router.post("/review/:status/:reqId", userAuth, async (req, res) => {
  try {
    const { status, reqId } = req.params;
    const loggedInId = req.user._id;

    const validStatuses = ["accepted", "rejected"];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        error: `Invalid status. Allowed statuses are: ${validStatuses.join(
          ", "
        )}`,
      });
    }
    const connectionRequest = await ConnectionRequest.findOne({
     
      _id: reqId,
      toUserId: loggedInId,
      status: "interested",
    });
    if (!connectionRequest)
      return res
        .status(404)
        .json({ error: "No pending connection request found from this user." });

    connectionRequest.status = status;
    const data = await connectionRequest.save();
    res.status(200).json({
      message: `Connection request ${status}  successfully.`,
      data: data,
    });
  } catch (err) {
    console.error("Error reviewing the connection request:", err);
    res.status(500).json({ error: err.message || "Internal server error." });
  }
});
module.exports = router;
