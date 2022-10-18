const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema(
  {
    //teamwork rating
    teamwork: {
      type: Number,
      required: true,
    },
    //work knowledge rating
    work_knowledge: {
      type: Number,
      required: true,
    },
    //communication with team rating
    communication_with_team: {
      type: Number,
      required: true,
    },
    //additional feedback
    additional_feedback: {
      type: "String",
    },
    review_to: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    reviewed_by: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Review = mongoose.model("Review", reviewSchema);

module.exports = Review;
