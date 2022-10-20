const passport = require("passport"); //Passport for authentication
const User = require("../models/user"); //User's model
const Review = require("../models/review"); //Review's model

//controller to render th efeedback form
module.exports.feedbackForm = async function (req, res) {
  //find the data of the reviewer by id
  let reviewer = await User.findById(req.params.reviewerId);

  //find the data of the employee by id
  let employee = await User.findById(req.params.employeeId);

  try {
    if (reviewer && req.params.reviewerId === res.locals.user.id) {
      if (employee) {
        req.flash("success", `Feedback form loaded`);

        //render the feedback form
        return res.render("feedback_form", {
          title: "ERM | Feedback Form",
          reviewer: reviewer,
          employee: employee,
        });
      } else {
        console.log("employee does not exist");
        req.flash("error", "employee does not exist");
        return res.redirect("/employee-dashboard/" + reviewer.id);
      }
    } else {
      console.log("unauthorised");
      req.flash("error", `Unauthorised access, login to continue`);
      return res.redirect("/sign-out");
    }
  } catch (error) {
    console.log(error);
    req.flash("error", "error in rendering the feedback form");
    return res.redirect("/employee-dashboard/" + reviewer.id);
  }
};

//controller to submit the feedback form
module.exports.submitFeedback = async function (req, res) {
  //find the data of the reviewer by id
  let reviewer = await User.findById(req.body.reviewerId);

  //find the data of the employer by id
  let employee = await User.findById(req.body.employeeId);

  try {
    if (reviewer && req.body.reviewerId === res.locals.user.id) {
      if (employee) {
        //the review Objectto submitthe review
        let reviewObject;
        //if the reviewer id exsts new record for review
        if (employee.assigned_reviewers.includes(reviewer.id)) {
          reviewObject = await Review.create({
            teamwork: req.body.teamwork,
            work_knowledge: req.body.knowledge,
            communication_with_team: req.body.communication,
            review_to: employee,
            reviewed_by: reviewer,
          });
          //save the changes into db
          await reviewObject.save();
        }

        //Remove the reviewed employee record from the assigned reviews of reviewers
        const index = await reviewer.assigned_reviews.indexOf(employee.id);
        if (index > -1) {
          // only splice when item is found
          reviewer.assigned_reviews.splice(index, 1); // 2nd parameter means remove one item only
        }
        await reviewer.save();

        //Remove the reviewer  from the assigned reviewers of employee
        const indexReviewer = await employee.assigned_reviewers.indexOf(
          reviewer.id
        );
        if (index > -1) {
          // only splice array when item is found
          employee.assigned_reviewers.splice(indexReviewer, 1); // 2nd parameter means remove one item only
        }
        await employee.save();

        //save the updates to reviewer and employee

        //add the review recordto the employee
        const employeeReviewRecord = await User.findById(employee.id);
        employeeReviewRecord.reviews = reviewObject;
        await employeeReviewRecord.save();
        // console.log(reviewer.assigned_reviews.indexOf(employee.id));

        req.flash(
          "success",
          `${reviewer.name} succesfully submitted feedback to ${employee.name}`
        );
        return res.redirect("/employee-dashboard/" + reviewer.id);
      } else {
        console.log("employee does not exist");
        req.flash("error", "employee does not exist");
        return res.redirect("/employee-dashboard/" + reviewer.id);
      }
    } else {
      console.log("unauthorised");
      req.flash("error", `Unauthorised access, login to continue`);
      return res.redirect("/sign-out");
    }
  } catch (error) {
    console.log(error);
    req.flash("error", "error in submiting feedback");
    return res.redirect("/employee-dashboard/" + reviewer.id);
  }
};
