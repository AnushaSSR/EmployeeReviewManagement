const express = require("express");
const router = express.Router();
const passport = require("passport"); //import passport for authentication

//Admin controllers
const adminController = require("../controllers/admin_controller");

//routes accesible to admin
//routes protected by authentication

//route to register employee
router.post(
  "/register-employee/:id",
  passport.authenticate("local", { failureRedirect: "/sign-in" }),
  adminController.registerEmployee
);

//route to get manage employee profile page
router.get(
  "/manage-profile/:empid/:adminid",
  passport.authenticate("local", { failureRedirect: "/sign-in" }),
  adminController.manageProfile
);

//route to get manage employee reviews page
router.get(
  "/manage-reviews/:empid/:adminid",
  passport.authenticate("local", { failureRedirect: "/sign-in" }),
  adminController.manageReviews
);

//route to update details of an employee
router.post(
  "/update-details/:empid/:adminid",
  passport.authenticate("local", { failureRedirect: "/sign-in" }),
  adminController.updateDetails
);

//route to update role of an employee
router.post(
  "/update-role/:empid/:adminid",
  passport.authenticate("local", { failureRedirect: "/sign-in" }),
  adminController.updateRole
);

//route to delete an employee
router.post(
  "/delete-employee/:empid/:adminid",
  passport.authenticate("local", { failureRedirect: "/sign-in" }),
  adminController.deleteEmployee
);

//route to assign reviewers to an employee
router.post(
  "/assign-to-review/:from/:to",
  passport.authenticate("local", { failureRedirect: "/sign-in" }),
  adminController.assignToReview
);

//route to update ratings of an employee
router.post(
  "/update-ratings",
  passport.authenticate("local", { failureRedirect: "/sign-in" }),
  adminController.updatePerformanceRating
);

//route to get the feedback form
router.get(
  "/feedback-form/:empid/:adminid",
  passport.authenticate("local", { failureRedirect: "/sign-in" }),
  adminController.feedbackForm
);

//route to add / submit feedback to an employee
router.post(
  "/submit-feedback",
  passport.authenticate("local", { failureRedirect: "/sign-in" }),
  adminController.submitFeedback
);

//routes accesible to admin
//routes protected by authentication

module.exports = router;
