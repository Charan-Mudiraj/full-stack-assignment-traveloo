const express = require("express");
const path = require("path");
const { User } = require("../db/schema");
const { adminLogin } = require("../middlewares/adminLogin");

const router = express.Router();

//login
router.get("/login", (req, res) => {
  res.sendFile(
    path.join(__dirname, "../public", "admin-pages/login/login.html")
  );
});

router.post("/login", adminLogin, (req, res) => {
  res.redirect("/admin/dashboard?adminID=" + req.body.id);
});

router.get("/dashboard", (req, res) => {
  res.sendFile(
    path.join(__dirname, "../public", "admin-pages/dashboard/dashboard.html")
  );
});

//add user
router.post("/add-user", async (req, res) => {
  const userID = parseInt(req.body.userID);
  const password = req.body.password;
  const newUser = new User({ userID, password });
  await newUser.save();
  console.log("user added with id: " + userID);
  res.json({ status: "ok", message: "user added with id: " + userID });
});

//get users
router.get("/user-updates", async (req, res) => {
  const users = await User.find({ isUpdated: true }).exec();
  res.json(users);
});

// go to views
router.get("/view", (req, res) => {
  res.sendFile(path.join(__dirname, "../public", "admin-pages/view/view.html"));
});
router.get("/all-users", async (req, res) => {
  const users = await User.find({}).exec();
  res.json(users);
});

//css reqs
router.get("/login.css", (req, res) => {
  res.sendFile(
    path.join(__dirname, "../public", "admin-pages/login/login.css")
  );
});
router.get("/dashboard.css", (req, res) => {
  res.sendFile(
    path.join(__dirname, "../public", "admin-pages/dashboard/dashboard.css")
  );
});
router.get("/view.css", (req, res) => {
  res.sendFile(path.join(__dirname, "../public", "admin-pages/view/view.css"));
});

module.exports = router;
