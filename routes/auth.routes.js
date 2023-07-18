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

router.post(
  "/signup",
  uploader.single("image"),
  isLoggedOut,
  async (req, res, next) => {
    // Retrieve form data from request body
    const { username, email, password } = req.body;
    const regex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
    const image = req.file.path;
    console.log("username");

    // Make sure users fill all mandatory fields:
    if (!username || !email || !password) {
      return res.render("index", {
        errorMessage:
          "All fields are mandatory. Please provide your username, email, and password.",
      });
    }
    if (!regex.test(password)) {
      return res.status(500).render("index", {
        errorMessage:
          "Password needs to have at least 6 characters and must contain at least one number, one lowercase, and one uppercase letter.",
      });
    }

    try {
      // Encrypt the password
      const saltRounds = 13;
      const salt = await bcrypt.genSalt(saltRounds);
      const passwordHash = await bcrypt.hash(password, salt);

      // Create a new user
      const newUser = await User.create({
        username,
        email,
        passwordHash,
        image,
      });

      res.redirect("/auth/login");
    } catch (error) {
      if (error instanceof mongoose.Error.ValidationError) {
        res.status(500).render("index", { errorMessage: error.message });
      } else if (error.code === 11000) {
        res.status(500).render("index", {
          errorMessage:
            "Username and email need to be unique. Either username or email is already used",
        });
      } else {
        next(error);
      }
    }
  }
);

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
      res.redirect("/userProfile");
    } else {
      res.render("auth/login", { passwordErrorMessage: "Incorrect password" });
      return;
    }
  } catch (error) {
    console.log("There has been an error: ", error);
  }
});

module.exports = router;
