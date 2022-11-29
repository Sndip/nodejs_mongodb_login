const express = require("express");
const router = express.Router();

//* Controller
const adminLoginController = require("../controller/adminLogin.controller");

router.get("/login", adminLoginController.getLogin);
router.get("/register", adminLoginController.getRegister);
router.get("/logout", adminLoginController.getLogout);
router.post("/login", adminLoginController.postLogin);
router.post("/register", adminLoginController.postRegister);

module.exports = router;
