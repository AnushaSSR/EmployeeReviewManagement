require("dotenv").config(); // to manage .env file
const mongoString =
  "mongodb+srv://awsCluster:awsPwd@employeereview.e8xxkt4.mongodb.net/test"; // fetch the data base url from the environment variable

const mongoose = require("mongoose"); //require mongoose
mongoose.connect(mongoString); //connect mongoose to url
const db = mongoose.connection; // establishing connection

//if any error in connectingto database
db.on("error", console.error.bind(console, "Error in connecting to MongoDB"));

//Connection to database is successful and create admin
db.once("open", function () {
  const home = require("../controllers/home_controller");
  console.log(`Connected to Database :: MongoDB`);
  home.createAdmin();
});

module.exports = db;
