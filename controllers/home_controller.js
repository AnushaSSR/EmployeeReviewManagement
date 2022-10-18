const passport = require("passport");
const User = require("../models/user");

//controller to render the home page
module.exports.home = function (req, res) {
  return res.render("home_page", {
    title: "Employee Review Management | Home Page",
  });
};

//controller to render sign up form
module.exports.signUp = function (req, res) {
  if (req.isAuthenticated()) {
    //if user is not authenticated
    return res.redirect("/");
  }
  return res.render("user_sign_up", {
    title: "Employee Review Management | Sign-up Page",
  });
};

//controller to render sign in form
module.exports.signIn = function (req, res) {
  if (req.isAuthenticated()) {
    //if user is not authenticated
    return res.redirect("/");
  }
  return res.render("user_sign_in", {
    title: "Employee Review Management | Sign-in Page",
  });
};

//controller to get the signup data and create the user
module.exports.create = function (req, res) {
  if (req.body.password != req.body.confirm_password) {
    //if the password and confrim passwords didn't match
    return res.redirect("back");
  }
  //fetch the user with the email
  User.findOne({ email: req.body.email }, function (err, user) {
    if (err) {
      console.log("error in finding user in signing up", err);
      return;
    }

    if (!user) {
      // if user doesn't exist create a new record
      User.create(req.body, function (err, user) {
        req.flash("success", "Signed up successfully, login to continue!");

        if (err) {
          console.log("error in creating user while signing up", err);
          return;
        }
        //flash message indicating success
        return res.redirect("/sign-in");
      });
    } else {
      //if user already exists
      req.flash("error", "User already exists");
      return res.redirect("back");
    }
  });
};

//controller to create a session for the signing in user
module.exports.createSession = async function (req, res) {
  try {
    req.flash("success", "Logged in succesfully");
    let user = await User.findOne({ email: req.body.email });
    let userRole = user.role;

    // access the employee controller
    if (userRole == "Employee") {
      //if user is employee redirect to employee dashboard
      return res.redirect("/employee-dashboard/" + user.id);
    } else {
      //else redirect to admin dashboard
      return res.redirect("/admin-dashboard/" + user.id);
    }
  } catch (err) {
    console.log(err);
    res.redirect("/");
  }
};

//controller to render employee-dashboard
module.exports.employeeDashboard = async function (req, res) {
  try {
    const employee = await User.findById(req.params.id)
      .populate({
        path: "assigned_reviewers",
        model: "User",
      })
      .populate({
        path: "assigned_reviews",
        model: "User",
      });

    if (req.isAuthenticated()) {
      //if user is authenticated
      return res.render("employee_dashboard", {
        title: "employee dashboard",
        employee: employee,
      });
    }
    return res.redirect("/");
  } catch (err) {
    console.log(err);
    return res.redirect("back");
  }
};

//controller to render admin-dashboard
module.exports.adminDashboard = async function (req, res) {
  try {
    let admin = await User.findById(req.params.id);

    let employees = await User.find({ role: "Employee" });

    if (req.isAuthenticated()) {
      //if user is authenticated
      return res.render("admin_dashboard", {
        title: "admin dashboard",
        admin: admin,
        employees: employees,
      });
    }
    return res.redirect("/");
  } catch (err) {
    console.log(err);
    res.redirect("back");
  }
};

//controller to destroy session upon clicking on sign out
module.exports.destroySession = function (req, res) {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    //flash message upon succesfully logging out
    req.flash("success", "You have Logged Out");
    res.redirect("/");
  });
};
