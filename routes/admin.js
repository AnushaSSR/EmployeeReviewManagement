const express = require("express");
const router = express.Router();
const passport = require("passport"); //import passport for authentication

//Admin controllers
const adminController = require("../controllers/admin_controller");

//routes accesible to admin
//routes protected by authentication

//route to register employee
router.post("/register-employee/:id", adminController.registerEmployee);

//route to get manage employee profile page
router.get("/manage-profile/:empid/:adminid", adminController.manageProfile);

//route to get manage employee reviews page
router.get("/manage-reviews/:empid/:adminid", adminController.manageReviews);

//route to update details of an employee
router.post("/update-details/:empid/:adminid", adminController.updateDetails);

//route to update role of an employee
router.post("/update-role/:empid/:adminid", adminController.updateRole);

//route to delete an employee
router.post("/delete-employee/:empid/:adminid", adminController.deleteEmployee);

//route to assign reviewers to an employee
router.post("/assign-to-review/:from/:to", adminController.assignToReview);

//route to update ratings of an employee
router.post("/update-ratings", adminController.updatePerformanceRating);

//route to get the feedback form
router.get("/feedback-form/:empid/:adminid", adminController.feedbackForm);

//route to add / submit feedback to an employee
router.post("/submit-feedback", adminController.submitFeedback);

//routes accesible to admin
//routes protected by authentication

module.exports = router;
