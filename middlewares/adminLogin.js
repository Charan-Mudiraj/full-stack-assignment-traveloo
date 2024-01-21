const { Admin } = require("../db/schema");

const adminLogin = async (req, res, next) => {
  const id = parseInt(req.body.id);
  const password = req.body.password;
  const admin = await Admin.findOne({ adminID: id, password: password });
  if (admin) {
    next();
  } else {
    res.status(404).send("Invalid Admin");
  }
};

module.exports = { adminLogin };
