//require express and create router
const { Router } = require("express");
const router = new Router();
const { default: mongoose } = require("mongoose");
const uploader = require("../config/cloudinary.config.js");

//require bcrypt
const bcrypt = require("bcryptjs");

//require Models
const User = require("../models/User.model");
const Habit = require("../models/Habits.model");

//require middleware
const { isLoggedIn, isLoggedOut } = require("../middleware/route-guard.js");

//GET /login route
router.get("/login", isLoggedOut, (req, res, next) => {
  res.render("auth/login", { errorMessage: null });
});

//POST to check if user is our user
router.post("/login", isLoggedOut, async (req, res, next) => {
  const { email, password } = req.body;
  console.log("SESSION =====>", req.session);
  //
  if (email === "" || password === "") {
    res.render("auth/login", {
      errorMessage: "Please enter both, email and password to login.",
    });
    return;
  }

  try {
    const currentUser = await User.findOne({ email });
    if (!currentUser) {
      res.render("auth/login", {
        errorMessage: "Email is not registered. Try with other email.",
      });
      return;
    } else if (bcrypt.compareSync(password, currentUser.passwordHash)) {
      req.session.currentUser = currentUser;
      res.redirect("/dashboard");
    } else {
      res.render("auth/login", { passwordErrorMessage: "Incorrect password" });
      return;
    }
  } catch (error) {
    console.log("There has been an error: ", error);
  }
});

module.exports = router;
