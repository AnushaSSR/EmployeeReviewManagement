//Import the express and use it to listen to the port
const express = require("express");
const app = express();
//Using the port 8000
const port = process.env.PORT || 8000;
//to import the express layouts
const expressLayouts = require("express-ejs-layouts");
//db connection
const db = require("./config/mongoose");
//use the express session
const session = require("express-session");
//to mange the .env files
require("dotenv").config();

// for authentication
const passport = require("passport");
const passportLocal = require("./config/passport-local-strategy");

const MongoStore = require("connect-mongo").default;
//to dsiplay the flash messages to user
const flash = require("connect-flash");
const customMware = require("./config/middleware");

//to parse teh data
app.use(require("body-parser").urlencoded({ extended: true }));
app.use(require("cookie-parser")());

//to use the files in the assets folder
app.use(express.static("./assets"));

//use the express layouts to load layout
app.use(expressLayouts);

//to let the app use the styling and scripst and apply to layout
app.set("layout extractStyles", true);
app.set("layout extractLayouts", true);

//set the app's view engine to ejs
app.set("view engine", "ejs");

//setting the path of the views
app.set("views", "./views");

//session to authenticate
app.use(
  session({
    name: "Placement Cell",
    secret: process.env.LOCAL_SECRET,
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: 1000 * 60 * 100,
    },
    store: MongoStore.create(
      {
        mongoUrl: process.env.DATABASE_URL,
        autoRemove: "disabled",
      },
      function (err) {
        // console.log(err || 'connect-mongodb setup ok');
      }
    ),
  })
);

//initialize the passport and get session
app.use(passport.initialize());
app.use(passport.session());

//set current user's usage
app.use(passport.setAuthenticatedUser);

// app.set('views','./views');
app.use(flash());
app.use(customMware.setFlash);

//use the routes path to get the rouites
app.use("/", require("./routes"));

//make the app listen to call on port and respond
app.listen(port, function (err) {
  if (err) {
    //if up and running
    console.log(`Error in loading server ${err}`);
  }
  console.log(`Server is up and running on port ::${port}`);
});
