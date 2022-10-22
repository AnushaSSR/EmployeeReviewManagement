const express = require("express");
const router = express.Router();
const passport = require("passport");

//employee controller
const employeeController = require("../controllers/employee_controller");

//routes accesible to employee
//route to get the feedback form by employee
router.get(
  "/feedback-form/:reviewerId/:employeeId",
  employeeController.feedbackForm
);

//route to submit feedback by employee
router.post("/submit-feedback", employeeController.submitFeedback);

//routes accesible to employee

module.exports = router;
