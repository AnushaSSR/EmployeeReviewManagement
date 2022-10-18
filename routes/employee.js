const express = require("express");
const router = express.Router();

//external jobs controllers
const employeeController = require("../controllers/employee_controller");

router.get(
  "/feedback-form/:reviewerId/:employeeId",
  employeeController.feedbackForm
);

router.post("/submit-feedback", employeeController.submitFeedback);

// //route for employee dashboard
// router.get('/dashboard', employeeController.dashboard);

// //route for employee sign in
// router.get('/sign-in', employeeController.signIn);

// //route to post the employee sign up data
// router.post('/create', employeeController.create);

// //route to create a session for the employee sign in,authenticated by passport
// router.post('/create-session', passport.authenticate(
//     'local',
//     {failureRedirect: '/employee/sign-in'},
// ), employeeController.createSession);

// //destroy the session of an employee
// router.get('/sign-out', employeeController.destroySession);

module.exports = router;
