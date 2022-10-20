const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    //user's name
    name: {
      type: String,
      required: true,
    },
    //user's email
    email: {
      type: String,
      required: true,
      unique: true,
    },
    //user's login password
    password: {
      type: String,
      required: true,
    },
    //user's phone number
    phone_number: {
      type: String,
      required: true,
    },
    //user's age
    age: {
      type: Number,
      required: true,
    },
    //user's gender
    gender: {
      type: String,
      enum: ["Male", "Female", "Not_revealed"],
      required: true,
    },

    //user's role
    role: {
      type: String,
      default: "Employee",
      enum: ["Employee", "Admin"],
    },
    //Assigned reviews to user
    assigned_reviews: [
      {
        type: mongoose.Schema.Types.ObjectId,
        model: "User",
      },
    ],
    //Assigned reviewers to user
    assigned_reviewers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    //Reviews list of user
    reviews: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Review",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
