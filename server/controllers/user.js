const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { secretOrkey } = process.env;

//Load user model
const User = require("../models/user");

//================>Laod Input Validation<===========
const validateRegisterInput = require("../validators/register");
const validateLoginInput = require("../validators/login");

// @route GET api/user/register
// @des Register User
// @access Public
exports.register = async (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);

  //=============>check validation<============
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const { name, avatar, email, password } = req.body;
  await User.findOne({ email }).then((user) => {
    if (user) {
      errors.email = "Email already Exist!";
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

// @route GET api/user/login
// @des Login User /Return the jwt Token
// @access Public

exports.login = async (req, res) => {
  const { email, password } = req.body;

  const { errors, isValid } = validateLoginInput(req.body);
  //=============>check validation<============
  if (!isValid) {
    return res.status(400).json(errors);
  }

  //Find user by email
  User.findOne({ email }).then((user) => {
    if (!user) {
      errors.email = "User not found";
      return res.status(404).json(errors);
    }
    //Check for user
    if (!user) {
      return res.status(404).json({ email: "User not found" });
    }

    //Check password
    bcrypt.compare(password, user.password).then((isMatch) => {
      if (isMatch) {
        const payload = {
          id: user.id,
          name: user.name,
          avatar: user.avatar,
        };
        // create jwt payload
        // Sign Token
        jwt.sign(payload, secretOrkey, { expiresIn: 3600 }, (err, token) => {
          res.json({
            success: true,
            token: "Bearer " + token,
          });
        });
      } else {
        errors.password = "Password incorrect";
        return res.status(400).json({ errors });
      }
    });
  });
};

// @route GET api/user/current;
// @des Return current user
// @access Private
exports.getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    if (user) {
      res.status(200).json(user);
    }
    // res.json(req.user);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
};
