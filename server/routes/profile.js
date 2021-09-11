const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const { protect, admin } = require("../middleware/auth");

const {
  currentUser,
  createProfile,
  handle_profile,
  user_id,
  all_profile,
} = require("../controllers/profile");
router.route("/me").get(protect, currentUser);
router.route("/createuser").post(protect, createProfile);
router.route("/handle/:handle").post(handle_profile);
router.route("/user/:user_id").post(user_id);
router.route("/all").get(all_profile);
module.exports = router;
