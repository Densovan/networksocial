const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateExperienceInput(data) {
  let errors = {};

  data.title = !isEmpty(data.title) ? data.title : "";
  data.company = !isEmpty(data.company) ? data.company : "";
  data.from = !isEmpty(data.from) ? data.from : "";
  data.location = !isEmpty(data.location) ? data.location : "";

  if (Validator.isEmpty(data.title)) {
    errors.title = "Job title field is required";
  }
  if (Validator.isEmpty(data.company)) {
    errors.company = "Company field is required";
  }
  if (Validator.isEmpty(data.from)) {
    errors.from = "From data field is required";
  }
  if (Validator.isEmpty(data.location)) {
    errors.location = "Location field is required";
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
