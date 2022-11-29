const bcrypt = require("bcrypt");
const AppError = require("../utils/applicationError");
const { tryCatch } = require("../utils/tryCatch");
const { validateAdminLogin } = require("../utils/joiValidate");

// *Models
const Admin = require("../model/admin.model");
const Stats = require("../model/dashboardStats.model");

// * LOGIN
//GET
exports.getLogin = tryCatch(async (req, res, next) => {
  let message = req.flash("error");
  let messageType;
  if (message.length > 0) {
    messageType = "error";
  }
  return res.render("main.ejs", {
    error: {
      type: messageType,
      message: message[0],
    },
    alert: {
      status: false,
      message: "",
    },
    formName1: "Login",
    formName2: "Form",
    link: "login",
  });
});

//POST
exports.postLogin = tryCatch(async (req, res, next) => {
  const { username, password } = req.body;

  //Validation
  const { error } = validateAdminLogin(req.body);
  if (error) {
    req.flash("error", `Error: ${error.details[0].message}`);
    return res.redirect("login");
  }

  const admin = await Admin.findOne({ username });

  if (!admin) {
    req.flash(
      "error",
      `Error: Username not registered!! Please Register your username.`
    );
    return res.redirect("login");
  }
  const doMatch = await bcrypt.compare(password, admin.password);
  if (!doMatch) {
    req.flash(
      "error",
      `Error: Password doesn't match!! Please Re-enter your password.`
    );
    return res.redirect("login");
  }

  //* Generate Auth Token
  req.session.profile = admin;
  req.session.role = "admin";
  return res.redirect("/admin");
});

// * REGISTER
//GET
exports.getRegister = tryCatch(async (req, res, next) => {
  let message = req.flash("error");
  let messageType;

  if (message.length > 0) {
    messageType = "error";
  }
  return res.render("main.ejs", {
    error: {
      type: messageType,
      message: message[0],
    },
    alert: {
      status: false,
      message: "",
    },
    formName1: "Register",
    formName2: "Form",
    link: "register",
  });
});

//POST
exports.postRegister = tryCatch(async (req, res, next) => {
  const { username, password } = req.body;

  //Validation
  const { error } = validateAdminLogin(req.body);
  if (error) {
    req.flash("error", `Error: ${error.details[0].message}`);
    return res.redirect("register");
  }
  const hashedPassword = await bcrypt.hash(password, 10);

  const stats = new Stats({
    users: 0,
    totalAmount: 0,
    employee: 0,
    admin: username,
  });

  await stats.save();

  const admin = await Admin.create({
    username,
    password: hashedPassword,
  });

  return res.render("main.ejs", {
    alert: {
      status: true,
      message: `Account ${username} has been created.`,
    },
    error: {
      message: false,
      type: "none",
    },
    formName1: "Register",
    formName2: "Form",
    link: "register",
  });
});

//* Get logout
exports.getLogout = tryCatch(async (req, res, next) => {
  req.session.destroy(function (err) {
    if (err) throw err;
    return res.status(200).json({
      success: true,
      message: "Successfully logout",
    });
  });
});

