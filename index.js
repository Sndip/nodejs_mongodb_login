//* Dotenv
require("dotenv").config();

//* Packages
const express = require("express");
const session = require("express-session");
const path = require("path");
const morgan = require("morgan");
const flash = require("connect-flash");

//* Database
const db = require("./config/db");

//* Import modules
const errorHandler = require("./middleware/errorHandler");

const app = express();

//* Middleware
app.use(express.json());
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(flash());

//* Session
app.set("trust proxy", 1); // trust first proxy
app.use(
  session({
    name: process.env.SESSION_NAME,
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false, // This will only work if you have https enabled!
      maxAge: 60000,
    },
  })
);

//* Company Detail
app.use((req, res, next) => {
  res.locals.company = {
    firstName: process.env.firstName,
    lastName: process.env.lastName,
  };
  next();
});

// !Patch
app.get("/favicon.ico", (req, res) => {
  res.sendStatus(404);
});

//* Setting a path for views
app.set("view engine", "ejs");
app.use("/public", express.static("public"));

//* Routes
// User

// Admin
const adminLoginRoutes = require("./router/adminLogin.routes");

//* API
// User

// Admin
app.use("/admin", adminLoginRoutes);
//* Error Handler
app.use(errorHandler);

//* Server Starting
db.then(() => {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, "0.0.0.0");
  console.log(`Application is running at PORT: ${PORT}`);
}).catch((err) => {
  console.log(err);
});
