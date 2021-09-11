const express = require("express");
const passport = require("passport");
const { protect, admin } = require("../middleware/auth");
const router = express.Router();

const { register, login, getUser } = require("../controllers/user");
router.route("/register").post(register);
router.route("/login").post(login);
router.route("/current/:id").get(getUser);
// router
//   .route("/current", passport.authenticate("jwt", { session: false }))
//   .get(getUser);
module.exports = router;
