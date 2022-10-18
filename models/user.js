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
    age: {
      type: Number,
      required: true,
    },
    gender: {
      type: String,
      required: true,
    },

    //user's role
    role: {
      type: String,
      default: "Employee",
      enum: ["Employee", "Admin"],
    },
    assigned_reviews: [
      {
        type: mongoose.Schema.Types.ObjectId,
        model: "User",
      },
    ],

    assigned_reviewers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],

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
