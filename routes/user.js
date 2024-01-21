const express = require("express");
const path = require("path");
const multer = require("multer");
const dotenv = require("dotenv");
const { User } = require("../db/schema.js");
const { userLogin } = require("../middlewares/userLogin");

const router = express.Router();
dotenv.config();

//login
router.get("/login", (req, res) => {
  res.sendFile(
    path.join(__dirname, "../public", "user-pages/login/login.html")
  );
});
router.post("/login", userLogin, (req, res) => {
  res.redirect("/user/profile?userID=" + req.body.id);
});
router.get("/profile", (req, res) => {
  res.sendFile(
    path.join(__dirname, "../public", "user-pages/profile/profile.html")
  );
});

//upload name and image
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    return cb(null, path.join(__dirname, "../uploads/"));
  },
  filename: (req, file, cb) => {
    return cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage: storage });
router.post("/update-user", upload.single("avatar"), async (req, res) => {
  let userID, username;
  if (req.query) {
    userID = parseInt(req.query.userID);
    username = req.query.username;
  }
  if (userID && username) {
    const imagePath = "uploads/" + req.file.filename;
    await User.findOneAndUpdate(
      { userID: userID },
      { $set: { name: username, imagePath: imagePath, isUpdated: true } }
    );
    res.json({ status: "ok", message: "user detials updated" });
  }
});

//get name and image
router.get("/avatar", async (req, res) => {
  const userID = parseInt(req.query.userID);
  const user = await User.findOne({ userID: userID });
  if (user) {
    const imagePath = user.imagePath;
    res.sendFile(path.join(__dirname + "/../" + imagePath));
  } else {
    res.json({ message: "fetch error" });
  }
});
router.get("/user-details", async (req, res) => {
  const userID = parseInt(req.query.userID);
  const user = await User.findOne({ userID: userID });
  if (user) {
    res.json({ user: user });
  } else {
    res.json({ message: "fetch error" });
  }
});

//delete user
router.get("/delete", async (req, res) => {
  const userID = parseInt(req.query.userID);
  await User.deleteOne({ userID: userID });
});

//approve user
router.get("/approve", async (req, res) => {
  const userID = parseInt(req.query.userID);
  await User.findOneAndUpdate(
    { userID: userID },
    { $set: { isApproved: true, isUpdated: false } }
  );
});

//css reqs
router.get("/login.css", (req, res) => {
  res.sendFile(path.join(__dirname, "../public", "user-pages/login/login.css"));
});

router.get("/profile.css", (req, res) => {
  res.sendFile(
    path.join(__dirname, "../public", "user-pages/profile/profile.css")
  );
});

module.exports = router;
