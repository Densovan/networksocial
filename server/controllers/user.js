const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
//Load user model
const User = require("../models/user");

// @route GET api/user/register
// @des Register User
// @access Public
exports.register = async (req, res) => {
  const { name, avatar, email, password } = req.body;
  await User.findOne({ email }).then((user) => {
    if (user) {
      return res.status(400).json({ msg: "Email already exist!" });
    } else {
      const avatar = gravatar.url(email, { s: "200", r: "pg", d: "mm" });
      const newUser = new User({
        name,
        avatar,
        email,
        password,
      });
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then((user) => res.json(user))
            .catch((err) => console.log(err));
        });
      });
    }
  });
};
