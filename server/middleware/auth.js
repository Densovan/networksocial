const jwt = require("jsonwebtoken");
const { secretOrkey } = process.env;

exports.protect = async (req, res, next) => {
  const token = req.header("Authorization");

  //check if not token
  if (!token) {
    return res.status(401).json({ msg: "No Token, authorization denied" });
  }

  //============>verify token<============
  try {
    const decoded = jwt.verify(token, secretOrkey);
    req.user = decoded.user;
    next();
  } catch (error) {
    return res.status(401).json({ msg: "Token is not valid" });
  }
};

exports.admin = async (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    res.status(401);
    return res.status(401).json({ msg: "No Token, authorization denied" });
  }
};
