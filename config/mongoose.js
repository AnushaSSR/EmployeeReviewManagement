require("dotenv").config(); // to manage .env file
const mongoString = process.env.DATABASE_URL;
const mongoose = require("mongoose"); //require mongoose
mongoose.connect(
  "mongodb+srv://ERM:erm@cluster0.geyqj6n.mongodb.net/?retryWrites=true&w=majority"
); //connect mongoose to url
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
