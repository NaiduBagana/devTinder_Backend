const express = require("express");
const router = express.Router();
const { userAuth } = require("../middlewares/auth");
const { User } = require("../models/user");
const ConnectionRequest = require("../models/connectionRequest");

router.get("/user/requests/received", userAuth, async (req, res) => {
  try {
    const userId = req.user._id;
    const requests = await ConnectionRequest.find({
      toUserId: userId,
      status: "interested",
    }).populate("fromUserId", "firstName lastName emailId photoUrl age gender");
    res.json({ requests });
  } catch (err) {
    console.error("Error in fetching received requests:", err);
    return res.status(500).send("Error in fetching received requests");
  }
});
router.get("/user/viewConnections", userAuth, async (req, res) => {
  try {
    const userId = req.user._id;
    const connections = await ConnectionRequest.find({
      $or: [
        { fromUserId: userId, status: "accepted" },
        { toUserId: userId, status: "accepted" },
      ],
    })
      .populate(
        "fromUserId toUserId",
        "firstName lastName emailId photoUrl age"
      )
      .populate("toUserId", "firstName lastName emailId photoUrl age");

    const data = connections.map((conn) => {
      if (conn.fromUserId._id.toString() === userId.toString())
        return conn.toUserId;
      else return conn.fromUserId;
    });
    res.status(200).json({ data });
  } catch (err) {
    console.error("Error in fetching connections:", err);
    return res.status(500).send("Error in fetching connections");
  }
});
router.get("/feed", userAuth, async (req, res) => {
  //user should see other users except himself and also the ones who are not connected or requested

  //   /feed?page=1&limit=10 => .skip(0) & .limit(10)
  // /feed?page=2&limit=10 => .skip(10) & .limit(10)
  // /feed?page=3&limit=10 => .skip(20) & .limit(10)
  try {
    const loggedInId = req.user._id;
    const page = parseInt(req.query.page) || 1;
    let limit = parseInt(req.query.limit) || 10;
    if (limit > 50) limit = 50; 
    const skip = (page - 1) * limit;
    const connectionRequests = await ConnectionRequest.find({
      $or: [{ fromUserId: loggedInId }, { toUserId: loggedInId }],
    });
    const excludedUserIds = new Set();
    excludedUserIds.add(loggedInId.toString());
    connectionRequests.forEach((req) => {
      excludedUserIds.add(req.fromUserId.toString());
      excludedUserIds.add(req.toUserId.toString());
    });
    const feedUsers = await User.find({
      _id: { $nin: Array.from(excludedUserIds) },
    }).select("firstName lastName emailId photoUrl skills").skip(skip).limit(limit);
    res.status(200).json({ data: feedUsers });
  } catch (err) {
    console.error("Error in fetching feed:", err);
    return res.status(500).send("Error in fetching feed");
  }
});

module.exports = router;
