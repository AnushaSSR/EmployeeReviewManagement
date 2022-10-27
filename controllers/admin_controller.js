const Review = require("../models/review");
const User = require("../models/user"); //Student model

//controller to add an employee by admin
module.exports.registerEmployee = async function (req, res) {
  try {
    let admin = await User.findById(req.params.id);

    if (admin && req.params.id === res.locals.user.id) {
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
          console.log("error in finding user in creating", err);
          return;
        }
        if (!user) {
          // if user doesn't exist create a new record
          User.create(req.body, function (err, user) {
            if (err) {
              //if there is error
              console.log("error in creating new employee", err);
              return;
            }

            //flash message indicating success
            req.flash("success", "New employee created successfully");
            return res.redirect("/admin-dashboard/" + admin.id);
          });
        } else {
          req.flash("error", "Employee already exists");
          return res.redirect("/admin-dashboard/" + admin.id);
        }
      });
    } else {
      console.log("unauthorised");
      req.flash("error", `Unauthorised access, login to continue`);
      return res.redirect("/sign-out");
    }
  } catch (error) {
    console.log(error);
    req.flash("error", "error in adding employee");
    return res.redirect("/admin-dashboard/" + admin.id);
  }
};

//controller to manage the employee profile , update ,delete and view
module.exports.manageProfile = async function (req, res) {
  try {
    //admin details by admin id
    let admin = await User.findById(req.params.adminid);
    //employee details by employee id
    let employee = await User.findById(req.params.empid);
    if (admin && req.params.adminid === res.locals.user.id) {
      if (employee && employee.role != "Admin") {
        //employees details by employee role
        let employees = await User.find({ role: "Employee" });
        return res.render("manage_profile", {
          title: "ERM | Manage Employee profile",
          admin: admin,
          employee: employee,
          employees: employees,
        });
      } else {
        //if user already exists
        console.log("employee does not exist");
        req.flash("error", "Employee does not exists");
        return res.redirect("/admin-dashboard/" + admin.id);
      }
    } else {
      console.log("unauthorised");
      req.flash("error", `Unauthorised access, login to continue`);
      return res.redirect("/sign-out");
    }
  } catch (error) {
    console.log(error);
    req.flash("error", "error in adding employee");
    return res.redirect("/admin-dashboard/" + admin.id);
  }
};

//controller to update the role of employee by admin
module.exports.updateRole = async function (req, res) {
  try {
    //admin details by admin id
    let admin = await User.findById(req.params.adminid);
    let employee = await User.findById(req.params.empid);

    if (admin && req.params.adminid === res.locals.user.id) {
      if (employee) {
        //update the role of the employee fetched by employee id
        employee.role = req.body.role;
        await employee.save();
        req.flash("success", `Role of ${employee.name} is updated`);

        //render employee_profile
        return res.render("manage_profile", {
          title: "ERM | Manage Employee profile",
          admin: admin,
          employee: employee,
        });
      } else {
        console.log("employee does not exist");
        req.flash("error", `employee does not exist`);
        return res.redirect("/admin-dashboard/" + admin.id);
      }
    } else {
      console.log("unauthorised");
      req.flash("error", `Unauthorised access, login to continue`);
      return res.redirect("/sign-out");
    }
  } catch (error) {
    console.log(error);
    req.flash("error", "error in updating employee role");
    return res.redirect("/admin-dashboard/" + admin.id);
  }
};

//controller to details of the employee
module.exports.updateDetails = async function (req, res) {
  //admin details by admin id
  let admin = await User.findById(req.params.adminid);
  //employee details by employee id
  let employee = await User.findById(req.params.empid);

  try {
    if (admin && req.params.adminid === res.locals.user.id) {
      if (employee) {
        //creating variables for details to be update, send from the body
        const name = req.body.name;
        const age = req.body.age;
        const number = req.body.number;
        const gender = req.body.gender;
        //update the employee object by values sent by body
        if (name != "") {
          employee.name = name;
        }
        if (age != "") {
          employee.age = age;
        }
        if (number != "") {
          if (number.length != 10) {
            //if the password and confrim passwords didn't match
            req.flash("error", "Enter valid 10 digit mobile number");
            return res.redirect("back");
          }

          employee.phone_number = number;
        }
        if (gender != "") {
          employee.gender = gender;
        }
        req.flash("success", `Details of ${employee.name} are updated`);

        await employee.save();

        // employee = await User.findById(req.params.empid);
        return res.render("manage_profile", {
          title: "ERM | Manage Employee profile",
          admin: admin,
          employee: employee,
        });
      } else {
        console.log("employee does not exist");
        req.flash("error", `employee does not exist`);
        return res.redirect("/admin-dashboard/" + admin.id);
      }
    } else {
      console.log("unauthorised");
      req.flash("error", `Unauthorised access, login to continue`);
      return res.redirect("/sign-out");
    }
  } catch (error) {
    console.log(error);
    req.flash("error", "error in updating employee details");
    return res.redirect("/admin-dashboard/" + admin.id);
  }
};

//controller to delete employee
module.exports.deleteEmployee = async function (req, res) {
  let admin = await User.findById(req.params.adminid);
  //fetch the employee and delete by id
  let employee = await User.findByIdAndRemove(req.params.empid);

  try {
    if (admin && req.params.adminid === res.locals.user.id) {
      if (employee) {
        let employees = await User.find({ role: "Employee" });

        return res.render("admin_dashboard", {
          title: "ERM | Admin Dashboard",
          admin: admin,
          employees: employees,
        });
      } else {
        console.log("employee does not exist");
        req.flash("error", "employee does not exist");
        return res.redirect("/admin-dashboard/" + admin.id);
      }
    } else {
      console.log("unauthorised");
      req.flash("error", `Unauthorised access, login to continue`);
      return res.redirect("/sign-out");
    }
  } catch (error) {
    console.log(error);
    req.flash("error", "error in deleting employee");
    return res.redirect("/admin-dashboard/" + admin.id);
  }
};

//Employee review management
module.exports.manageReviews = async function (req, res) {
  let admin = await User.findById(req.params.adminid);
  let employee = await User.findById(req.params.empid);
  try {
    if (admin && req.params.adminid === res.locals.user.id) {
      if (employee && employee.role != "Admin") {
        let reviews = await Review.find({ review_to: req.params.empid })
          .populate({
            path: "reviewed_by",
            model: "User",
          })
          .populate({
            path: "review_to",
            model: "User",
          });

        let employees = await User.find({ role: "Employee" });
        employee = await User.findById(req.params.empid)
          .populate({
            path: "assigned_reviewers",
            model: "User",
          })
          .populate({
            path: "assigned_reviews",
            model: "User",
          })
          .populate({
            path: "reviews",
            model: "Review",
          });
        return res.render("manage_reviews", {
          title: "ERM | Manage Employee Reviews",
          admin: admin,
          employee: employee,
          employees: employees,
          reviews: reviews,
        });
      } else {
        console.log("employee does not exists");
        res.redirect("/admin-dashboard/" + admin.id);
      }
    } else {
      console.log("Unauthorised");
      res.redirect("/sign-out");
    }
  } catch (error) {
    console.log(error);
    req.flash("error", "error in loading manage review page");
    return res.redirect("/admin-dashboard/" + admin.id);
  }
};

module.exports.assignToReview = async function (req, res) {
  let admin = await User.findById(req.body.admin);
  let toEmployee = await User.findById(req.params.to);
  let fromEmployee = await User.findById(req.params.from);

  try {
    if (admin && req.body.admin === res.locals.user.id) {
      if (toEmployee && fromEmployee) {
        let assignedReviewList = fromEmployee.assigned_reviews;
        let assignedReviewersList = toEmployee.assigned_reviewers;

        let assignedReviewer = toEmployee.assigned_reviewers.filter((a) => {
          return a.equals(fromEmployee.id);
        });

        if (!assignedReviewer.length) {
          assignedReviewList?.push(toEmployee);
          await fromEmployee.save();

          assignedReviewersList?.push(fromEmployee);
          await toEmployee.save();
        }
        const employee = await User.findById(req.params.to)
          .populate({
            path: "assigned_reviewers",
            model: "User",
          })
          .populate({
            path: "assigned_reviews",
            model: "User",
          });

        let employees = await User.find({ role: "Employee" });
        req.flash(
          "success",
          `${fromEmployee.name} is assigned to review ${toEmployee.name}`
        );

        return res.redirect("back");
      } else {
        if (!fromEmployee) {
          console.log("reviewer does not exist");

          req.flash("reviewer does not exist");
          return res.redirect("back");
        } else if (!toEmployee) {
          console.log("employee does not exist");

          req.flash("employee does not exist");

          return res.redirect("/admin-dashboard/" + admin.id);
        }
      }
    } else {
      console.log("unauthorised");
      req.flash("error", `Unauthorised access, login to continue`);
      return res.redirect("/sign-out");
    }
  } catch (error) {
    console.log(error);
    req.flash("error", "error in adding employee");
    return res.redirect("/admin-dashboard/" + admin.id);
  }
};

module.exports.feedbackForm = async function (req, res) {
  //find the data of the reviewer by id
  let reviewer = await User.findById(req.params.adminid);

  // //find the data of the employee by id
  let employee = await User.findById(req.params.empid);
  try {
    req.flash("success", `Feedback form loaded`);

    //render the feedback form
    if (reviewer && req.params.adminid === res.locals.user.id) {
      if (employee) {
        return res.render("feedback_form", {
          title: "ERM | Feedback Form",
          reviewer: reviewer,
          employee: employee,
        });
      } else {
        console.log("Employee does not exist");
        req.flash("error", "Employee does not exist");
        return res.redirect("/admin-dashboard/" + admin.id);
      }
    } else {
      console.log("unauthorised");
      req.flash("error", `Unauthorised access, login to continue`);
      return res.redirect("/sign-out");
    }
  } catch (error) {
    console.log(error);
    req.flash("error", "error in rendering the feedback form");
    return res.redirect("/admin-dashboard/" + reviewer.id);
  }
};

//controller to submit feedback to employee by admin
module.exports.submitFeedback = async function (req, res) {
  //find the data of the reviewer by id
  let reviewer = await User.findById(req.body.reviewerId);

  //find the data of the employer by id
  let employee = await User.findById(req.body.employeeId);
  try {
    //the review Object to submit the review
    if (reviewer && req.body.reviewerId === res.locals.user.id) {
      if (employee) {
        let reviewObject = await Review.create({
          teamwork: req.body.teamwork,
          work_knowledge: req.body.knowledge,
          communication_with_team: req.body.communication,
          review_to: employee,
          reviewed_by: reviewer,
        });

        //save the changes into db
        await reviewObject.save();

        //save the updates to reviewer and employee

        //add the review record to the employee
        const employeeReviewRecord = await User.findById(employee.id);
        employeeReviewRecord.reviews = reviewObject;
        await employeeReviewRecord.save();

        req.flash(
          "success",
          `${reviewer.name} succesfully submitted feedback to ${employee.name}`
        );

        //redirect to manage reviews page
        return res.redirect(
          "/admin/manage-reviews/" + employee.id + "/" + reviewer.id
        );
      } else {
        console.log("Employee does not exist");
        req.flash("error", "employee does not exist");
        return res.redirect("/admin-dashboard/" + admin.id);
      }
    } else {
      console.log("unauthorised");
      req.flash("error", `Unauthorised access, login to continue`);
      return res.redirect("/sign-out");
    }
  } catch (error) {
    console.log(error);
    req.flash("error", "error in submiting feedback");
    return res.redirect("/admin-dashboard/" + reviewer.id);
  }
};

module.exports.updatePerformanceRating = async function (req, res) {
  // //find the data of the reviewer by id
  let admin = await User.findById(req.body.adminid);

  //find the data of the employer by id
  let employee = await User.findById(req.body.empid);

  try {
    if (admin && req.body.adminid === res.locals.user.id) {
      if (employee) {
        //update the review details of the review submitted
        let review = await Review.findById(req.body.reviewid);
        const teamwork = req.body.teamwork;
        const knowledge = req.body.knowledge;
        const communication = req.body.communication;

        if (teamwork != undefined) {
          review.teamwork = teamwork;
        }
        if (knowledge != undefined) {
          review.work_knowledge = knowledge;
        }
        if (communication != undefined) {
          review.communication_with_team = communication;
        }

        await review.save();
        req.flash("success", `Performance rating is updated`);

        //redirect manage review page
        return res.redirect("back");
      } else {
        console.log("employee does not exist");
        req.flash("error", "employee does not exist");
        return res.redirect("/admin-dashboard/" + admin.id);
      }
    } else {
      console.log("unauthorised");
      req.flash("error", `Unauthorised access, login to continue`);
      return res.redirect("/sign-out");
    }
  } catch (error) {
    console.log(error);
    req.flash("error", "error in updating performance rating");
    return res.redirect("/admin-dashboard/" + admin.id);
  }
};
