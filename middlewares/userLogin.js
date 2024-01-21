const { User } = require("../db/schema");

const userLogin = async (req, res, next) => {
  const id = parseInt(req.body.id);
  const password = req.body.password;
  const user = await User.findOne({ userID: id, password: password });
  if (user) {
    next();
  } else {
    res.status(404).send("Invalid User");
  }
};

module.exports = { userLogin };
