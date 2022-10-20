const passport = require("passport"); //passport for authentication
const User = require("../models/user"); //user model

//controller to create admin
module.exports.createAdmin = async function () {
  const adminUser = {
    name: "Admin",
    email: "admin@gmail.com",
    password: "login",
    phone_number: 7897897890,
    age: 67,
    gender: "Female",
    role: "Admin",
  };

  //fetch the user with the email
  User.findOne({ email: adminUser.email }, function (err, user) {
    if (err) {
      console.log("error in creating admin");
      return;
    }

    if (!user) {
      // if user doesn't exist create a new record
      User.create(adminUser, function (err, user) {
        if (err) {
          console.log("error in creating user while signing up");
          return;
        }
        //flash message indicating success
        console.log("Admin Created");
      });
    } else {
      //if user already exists
      console.log("error", "Admin already created");
    }
  });
};

//controller to render the home page
module.exports.home = function (req, res) {
  return res.render("home_page", {
    title: "ERM | Home Page",
  });
};

//controller to render sign up form
module.exports.signUp = function (req, res) {
  if (req.isAuthenticated()) {
    //if user is not authenticated
    return res.redirect("/");
  }
  return res.render("user_sign_up", {
    title: "ERM | Sign-up Page",
  });
};

//controller to render sign in form
module.exports.signIn = function (req, res) {
  if (req.isAuthenticated()) {
    //if user is not authenticated
    return res.redirect("/");
  }
  return res.render("user_sign_in", {
    title: "ERM | Sign-in Page",
  });
};

//controller to get the signup data and create the user
module.exports.create = async function (req, res) {
  if (req.body.password != req.body.confirm_password) {
    //if the password and confrim passwords didn't match
    req.flash("error", "Password and confirm password didnt match!");
    return res.redirect("back");
  }

  if (req.body.phone_number.length != 10) {
    //if the password and confrim passwords didn't match
    req.flash("error", "Enter valid 10 digit mobile number");
    return res.redirect("back");
  }

  //fetch the user with the email
  User.findOne({ email: req.body.email }, function (err, user) {
    if (err) {
      console.log("error in finding user in signing up");
      return;
    }

    if (!user) {
      // if user doesn't exist create a new record
      User.create(req.body, function (err, user) {
        if (err) {
          console.log("error in creating user while signing up");
          return;
        }
        //flash message indicating success
        req.flash("success", "Signed up successfully, login to continue!");
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
    return res.redirect("/");
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
    //if user is authenticated and valid
    if (
      req.isAuthenticated() &&
      employee &&
      req.params.id === res.locals.user.id
    ) {
      return res.render("employee_dashboard", {
        title: "ERM | Employee Dashboard",
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

    //if user is authenticated and valid
    if (admin && req.params.id === res.locals.user.id) {
      if (req.isAuthenticated()) {
        return res.render("admin_dashboard", {
          title: "ERM | Admin Dashboard",
          admin: admin,
          employees: employees,
        });
      }
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
