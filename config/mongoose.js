require('dotenv').config();// to manage .env file
const mongoString = process.env.DATABASE_URL;// fetch the data base url from the environment variable

const mongoose = require('mongoose');//require mongoose
mongoose.connect(mongoString);//connect mongoose to url
const db = mongoose.connection;// establishing connection

//if any error in connectingto database
db.on('error', console.error.bind(console, "Error in connecting to MongoDB"));

//Connection to database is succesful
db.once('open', function () {
    console.log(`Connected to Database :: MongoDB`);
});

module.exports = db;


