const express = require("express");
const path = require("path");
const adminRoutes = require("./routes/admin");
const userRoutes = require("./routes/user");
const dotenv = require("dotenv");
const { urlencoded } = require("body-parser");
const { connect } = require("mongoose");

const app = express();
dotenv.config();
//middle-wares

app.use(urlencoded({ extended: true }));
app.use(express.json());
app.use("/admin", adminRoutes);
app.use("/user", userRoutes);
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.send("landing pagr");
});
app.listen(process.env.PORT, () => {
  console.log("Listening on Port: 3000");
});

//connect to DB
connect(process.env.MONGODB_URL);
