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

router.get("/employee-dashboard/:id", homeController.employeeDashboard);
router.get("/admin-dashboard/:id", homeController.adminDashboard);

router.use("/admin", require("./admin"));

router.use("/employee", require("./employee"));

// //use the employee route
// router.use("/employee", require("./employee"));
// //use the students route
// router.use('/students',require('./students'));
// //use the interviews route
// router.use('/interviews',require('./interviews'));
// //use the external jobs route
// router.use('/external-jobs', require('./admin'));
// //use the report route
// router.use('/report', require('./report'));

module.exports = router;
