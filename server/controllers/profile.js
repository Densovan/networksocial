//Load validation
const validatorProfileInput = require("../validators/profile.js");
const validatorExperienceInput = require("../validators/experience");
const validatorEducationInput = require("../validators/educaion");

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
    res.status(500).json(errors);
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
  // Skills - Spilt into array
  if (typeof req.body.skills !== "undefined") {
    profileFields.skills = req.body.skills.split(",");
  }

  // Social
  profileFields.social = {};
  if (req.body.youtube) profileFields.social.youtube = req.body.youtube;
  if (req.body.twitter) profileFields.social.twitter = req.body.twitter;
  if (req.body.facebook) profileFields.social.facebook = req.body.facebook;
  if (req.body.linkedin) profileFields.social.linkedin = req.body.linkedin;
  if (req.body.instagram) profileFields.social.instagram = req.body.instagram;

  Profile.findOne({ user: req.user.id }).then((profile) => {
    if (profile) {
      // Update
      Profile.findOneAndUpdate(
        { user: req.user.id },
        { $set: profileFields },
        { new: true }
      ).then((profile) => res.json(profile));
    } else {
      // Create

      // Check if handle exists
      Profile.findOne({ handle: profileFields.handle }).then((profile) => {
        if (profile) {
          errors.handle = "That handle already exists";
          res.status(400).json(errors);
        }

        // Save Profile
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
      return res.status(404).json({ msg: "There are no Profile" });
    }
    res.json(profile);
  } catch (error) {
    res.status(404).json({ msg: "There are no profile" });
  }
};

//@route POST/api/profile/experience
//@desc Add experience to profile
//@access Private
exports.add_experience = async (req, res) => {
  const { errors, isValid } = validatorExperienceInput(req.body);
  //check validator
  if (!isValid) {
    return res.status(400).json(errors);
  }
  const profile = await Profile.findOne({ user: req.user.id });

  if (profile) {
    const newExp = {
      title: req.body.title,
      company: req.body.company,
      from: req.body.from,
      location: req.body.location,
      to: req.body.to,
      current: req.body.current,
      description: req.body.description,
    };
    //Add to exp array
    profile.experience.unshift(newExp);
    await profile.save();
    res.json(profile);
  }
};

//@route POST/api/profile/education
//@desc Add aducation to profile
//@access Private
exports.add_education = async (req, res) => {
  const { errors, isValid } = validatorEducationInput(req.body);
  //check validator
  if (!isValid) {
    return res.status(400).json(errors);
  }
  const profile = await Profile.findOne({ user: req.user.id });

  if (profile) {
    const newEdu = {
      school: req.body.school,
      degree: req.body.degree,
      fieldofstudy: req.body.fieldofstudy,
      from: req.body.from,
      to: req.body.to,
      current: req.body.current,
      description: req.body.description,
    };
    //Add to edu array
    profile.education.unshift(newEdu);
    await profile.save();
    res.json(profile);
  }
};

//@route DELETE/api/profile/experience
//@desc DELETE experience to profile
//@access Private
exports.delete_experience = async (req, res) => {
  try {
    const foundProfile = await Profile.findOne({ user: req.user.id });
    foundProfile.experience = foundProfile.experience.filter(
      (exp) => exp._id.toString() !== req.params.exp_id
    );
    await foundProfile.save();
    return res.status(200).json(foundProfile);
  } catch (error) {
    res.status(404).json({ msg: "There is no profile for this user" });
  }
};

//@route DELETE/api/profile/education
//@desc DELETE education to profile
//@access Private
exports.delete_education = async (req, res) => {
  try {
    const foundProfile = await Profile.findOne({ user: req.user.id });
    foundProfile.education = foundProfile.education.filter(
      (edu) => edu._id.toString() !== req.params.edu_id
    );
    await foundProfile.save();
    return res.status(200).json(foundProfile);
  } catch (error) {
    res.status(404).json({ msg: "There is no profile for this user" });
  }
};

//@route DELETE/api/profile
//@desc DELETE user and profile
//@access Private
exports.delete_profile = async (req, res) => {
  try {
    await Profile.findOneAndRemove({ user: req.user.id });
    await User.findOneAndRemove({ _id: req.user.id });
    res.json({ success: true });
  } catch (error) {
    res.status(404).json({ msg: "server errors" });
  }
};
