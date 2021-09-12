//load Post model
const Post = require("../models/post");
const Profile = require("../models/profile");

//Validation
const validationPostInput = require("../validators/post");

//@route POST/api/post
//@desc create post
//@access Private
exports.create_post = async (req, res) => {
  try {
    const { errors, isValid } = validationPostInput(req.body);
    //Check validtaion
    if (!isValid) {
      //if any errors, send 400 with errors objects
      return res.status(400).json(errors);
    }
    const { text, name, avatar } = req.body;
    const newPost = new Post({
      text,
      name,
      avatar,
      user: req.user.id,
    });
    await newPost.save();
    res.status(200).json(newPost);
  } catch (error) {
    console.log(error.message);
    res.status(500).send(" Server Error");
  }
};

//@route GET/api/posts
//@desc get posts
//@access Public
exports.get_posts = async (req, res) => {
  try {
    const posts = await Post.find({}).sort({ date: -1 });
    res.status(200).json(posts);
  } catch (error) {
    console.log(error.message);
    res.status(500).send(" Server Error");
  }
};

//@route GET/api/post/:id
//@desc get post by id
//@access Public
exports.get_post = async (req, res) => {
  try {
    const post = await Post.findById({ _id: req.params.id });
    if (post) {
      await res.status(200).json(post);
    } else {
      res.status(404).json({ msg: "Post not found" });
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).send(" Server Error");
  }
};

//@route DELETE/api/post/:id
//@desc delete Post
//@access Private

exports.delete_post = async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });
    if (profile) {
      const post = await Post.findById(req.params.id);
      //check for post owner
      if (post.user.toString() !== req.user.id) {
        return res.status(401).json({ msg: "User not authorize" });
      } else {
        //Delete
        await post.remove();
        res.status(200).json({ success: true });
      }
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).send(" Server Error");
  }
};

//@route POST/api/posts/like/:id
//@desc like Post
//@access Private

exports.like_post = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    // Check if the post has already been liked
    if (post.likes.some((like) => like.user.toString() === req.user.id)) {
      return res.status(400).json({ msg: "Post already liked" });
    }
    post.likes.unshift({ user: req.user.id });
    await post.save();
    return res.json(post);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

//@route POST/api/posts/unlike/:id
//@desc Unlike Post
//@access Private

exports.unlike_post = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    // Check if the post has already been liked
    if (!post.likes.some((like) => like.user.toString() === req.user.id)) {
      return res.status(400).json({ msg: "Post has not yet been liked" });
    }
    //remove like
    post.likes = post.likes.filter(
      (like) => like.user.toString() !== req.user.id
    );
    await post.save();
    res.status(200).json(post);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

//@route POST/api/posts/comment/:id
//@desc Add comment to post
//@access Private
exports.comment_post = async (req, res) => {
  try {
    const { errors, isValid } = validationPostInput(req.body);
    //Check validtaion
    if (!isValid) {
      //if any errors, send 400 with errors objects
      return res.status(400).json(errors);
    }
    const post = await Post.findById(req.params.id);
    const { text, name, avatar } = req.body;
    if (post) {
      const newComment = {
        text,
        name,
        avatar,
        user: req.user.id,
      };
      //Add comment to array
      post.comments.unshift(newComment);
      //Save to database
      await post.save();
      await res.status(200).json(post);
    }
  } catch (error) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

//@route DELETE/api/posts/comment/:id//:comment_id
//@desc DELETE comment from post
//@access Private
exports.delete_comment = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (post) {
      //check if comment exists
      if (
        !post.comments.filter(
          (comment) => comment._id.toString() === req.params.comment_id
        )
      ) {
        res.status(404).json({ msg: "Comment does not exist" });
      }
      //Get remove index
      post.comments = post.comments.filter(
        (comment) => comment.user.toString() !== req.user.id
      );
      await post.save();
      res.status(200).json(post);
    }
  } catch (error) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};
