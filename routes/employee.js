const express = require("express");
const router = express.Router();
const passport = require("passport");

//employee controller
const employeeController = require("../controllers/employee_controller");

//routes accesible to employee
//protected routes
//route to get the feedback form by employee
router.get(
  "/feedback-form/:reviewerId/:employeeId",
  passport.authenticate("local", { failureRedirect: "/sign-in" }),
  employeeController.feedbackForm
);

//route to submit feedback by employee
router.post(
  "/submit-feedback",
  passport.authenticate("local", { failureRedirect: "/sign-in" }),
  employeeController.submitFeedback
);

//routes accesible to employee
//protected routes

module.exports = router;
