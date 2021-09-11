//Load validation
const validatorProfileInput = require("../validators/profile.js");

//Load Profile Model
const Profile = require("../models/profile");
//load user model
const User = require("../models/user");

//@route GET/api/profile
//@desc Get current user profile
//@access Private
exports.currentUser = async (req, res) => {
  const errors = {};
  try {
    const user = await Profile.findOne({ user: req.user.id }).populate("user", [
      "name",
      "avatar",
    ]);
    if (user) {
      await res.status(200).json(user);
    }
    if (!user) {
      errors.noprofile = "There is no profile for this user";
      return res.status(404).json(errors);
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).send(" Server Error");
  }
};

//@route POST/api/profile
//@desc Create or edit profile
//@access Private
exports.createProfile = (req, res) => {
  const { errors, isValid } = validatorProfileInput(req.body);
  // Check Validation
  if (!isValid) {
    //Retrun any errors with 400 status
    return res.status(400).json(errors);
  }

  // Get fields
  const profileFields = {};
  profileFields.user = req.user.id;
  if (req.body.handle) profileFields.handle = req.body.handle;
  if (req.body.company) profileFields.company = req.body.company;
  if (req.body.website) profileFields.website = req.body.website;
  if (req.body.location) profileFields.location = req.body.location;
  if (req.body.bio) profileFields.bio = req.body.bio;
  if (req.body.status) profileFields.status = req.body.status;
  if (req.body.githubusername)
    profileFields.githubusername = req.body.githubusername;
  // Skills - Split into array
  if (typeof req.body.skills !== "undefined") {
    profileFields.skills = req.body.skills.split(",");
  }
  // Social
  profileFields.social = {};
  if (req.body.youtube) profileFields.social.youtube = req.body.social.youtube;
  if (req.body.twitter) profileFields.social.twitter = req.body.social.twitter;
  if (req.body.facebook)
    profileFields.social.facebook = req.body.social.facebook;
  if (req.body.linkedin)
    profileFields.social.linkedin = req.body.social.linkedin;
  if (req.body.instagram)
    profileFields.social.instagram = req.body.social.instagram;

  Profile.findOne({ user: req.user.id }).then((profile) => {
    if (profile) {
      //Update
      Profile.findOneAndUpdate(
        { user: req.user.id },
        { $set: profileFields },
        { new: true }
      ).then((profile) => res.json(profile));
    } else {
      //Create

      //Check if handle exists
      Profile.findOne({ handle: profileFields.handle }).then((profile) => {
        if (profile) {
          errors.handle = "That handle already exists";
          res.status(400).json({ msg: "That handle already existss" });
        }

        //Save profile
        new Profile(profileFields).save().then((profile) => res.json(profile));
      });
    }
  });
};

//@route GET/api/profile/handle/:handle
//@desc Get profile by handle
//@access Public
exports.handle_profile = async (req, res) => {
  const errors = {};
  Profile.findOne({ handle: req.params.handle })
    .populate("user", ["name", "avatar"])
    .then((profile) => {
      if (!profile) {
        errors.noprofile = "There is no profile for this user";
        res.status(404).json(errors);
      } else {
        res.status(200).json(profile);
      }
    })
    .catch((err) =>
      res.status(404).json({ msg: "There is no profile for this user" })
    );
};

//@route GET/api/profile/user/:user_id
//@desc Get profile by user ID
//@access Public
exports.user_id = async (req, res) => {
  const errors = {};
  Profile.findOne({ user: req.params.user_id })
    .populate("user", ["name", "avatar"])
    .then((profile) => {
      if (!profile) {
        errors.noprofile = "There is no profile for this user";
        res.status(404).json(errors);
      } else {
        res.status(200).json(profile);
      }
    })
    .catch((err) =>
      res.status(404).json({ msg: "There is no profile for this user" })
    );
};

//@route GET/api/profile/all
//@desc Get all profile
//@access Public

exports.all_profile = async (req, res) => {
  const errors = {};
  try {
    const profile = await Profile.find().populate("user", ["name", "avatar"]);
    if (!profile) {
      errors.noprofile = "There are no profile";
      return res.status(404).json(errors);
    }
    res.json(profile);
  } catch (error) {
    res.status(404).json({ msg: "There are no profile" });
  }
};
