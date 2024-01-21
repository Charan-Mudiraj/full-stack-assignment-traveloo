const { Schema, model } = require("mongoose");

const AdminSchema = new Schema({
  adminID: {
    type: Number,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});
const UserSchema = new Schema({
  userID: {
    type: Number,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    default: "-",
  },
  password: {
    type: String,
  },
  imagePath: {
    type: String,
    default: "uploads/default.png",
  },
  isUpdated: {
    type: Boolean,
    default: false,
  },
  isApproved: {
    type: Boolean,
    default: false,
  },
});

const Admin = model("admin", AdminSchema);
const User = model("user", UserSchema);

module.exports = { User, Admin };
