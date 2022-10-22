// Entry point for all the routes
const express = require("express");
const router = express.Router();
//import passport for authentication
const passport = require("passport");

// accessthe home controller
const homeController = require("../controllers/home_controller");
//route to get home page
router.get("/", homeController.home);

//route to get signin page
router.get("/sign-in", homeController.signIn);

//route to get signup page
router.get("/sign-up", homeController.signUp);

//route to post the employee sign up data
router.post("/create", homeController.create);

//route to create a session for the employee sign in,authenticated by passport
router.post(
  "/create-session",
  passport.authenticate("local", { failureRedirect: "/sign-in" }),
  homeController.createSession
);

//destroy the session of an employee
router.get("/sign-out", homeController.destroySession);

//protected route to get the employee dashboard
router.get("/employee-dashboard/:id", homeController.employeeDashboard);

//protected route to get the admin dashboard
router.get("/admin-dashboard/:id", homeController.adminDashboard);

//use the admin route
router.use("/admin", require("./admin"));

//use the employee route
router.use("/employee", require("./employee"));

module.exports = router;
