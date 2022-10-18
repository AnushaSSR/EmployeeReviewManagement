const express = require("express");
const router = express.Router();

//external jobs controllers
const adminController = require("../controllers/admin_controller");

// // router.get('/dashboard/:id', homeController.employeeDashboard);
// router.get("/dashboard/:id", adminController.adminDashboard);

//route to get the external jobs
router.post("/register-employee/:id", adminController.registerEmployee);
router.get("/manage-profile/:empid/:adminid", adminController.manageProfile);
router.get("/manage-reviews/:empid/:adminid", adminController.manageReviews);

router.post("/update-details/:empid/:adminid", adminController.updateDetails);
router.post("/update-role/:empid/:adminid", adminController.updateRole);
router.post("/delete-employee/:empid/:adminid", adminController.deleteEmployee);
router.post("/assign-to-review/:from/:to", adminController.assignToReview);
router.get("/feedback-form/:empid/:adminid", adminController.feedbackForm);
router.post("/update-ratings", adminController.updatePerformanceRating);

router.post("/submit-feedback", adminController.submitFeedback);

module.exports = router;
