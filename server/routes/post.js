const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const { protect, admin } = require("../middleware/auth");

const {
  create_post,
  get_posts,
  get_post,
  delete_post,
  like_post,
  unlike_post,
  comment_post,
  delete_comment,
  edit_post,
} = require("../controllers/post");
router.route("/create_post").post(protect, create_post);
router.route("/get_posts").get(get_posts);
router.route("/get_post/:id").get(get_post);
router.route("/delete_post/:id").delete(protect, delete_post);
router.route("/like_post/:id").post(protect, like_post);
router.route("/unlike_post/:id").post(protect, unlike_post);
router.route("/comment_post/:id").post(protect, comment_post);
router.route("/delete_comment/:id/:comment_id").delete(protect, delete_comment);
router.route("/edit_post/:id").put(protect, edit_post);

module.exports = router;
