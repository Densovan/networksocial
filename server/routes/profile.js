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
  add_experience,
  add_education,
  delete_experience,
  delete_education,
  delete_profile,
} = require("../controllers/profile");
router.route("/me").get(protect, currentUser);
router.route("/createuser").post(protect, createProfile);
router.route("/handle/:handle").post(handle_profile);
router.route("/user/:user_id").post(user_id);
router.route("/all").get(all_profile);
router.route("/experience").post(protect, add_experience);
router.route("/education").post(protect, add_education);
router.route("/delete_experience/:exp_id").delete(protect, delete_experience);
router.route("/delete_education/:edu_id").delete(protect, delete_education);
router.route("/delete_profile").delete(protect, delete_profile);
module.exports = router;
