const router = require("express").Router();
const mongoose = require("mongoose");
const uploader = require("../config/cloudinary.config.js");

//require bcrypt
const bcrypt = require("bcryptjs");

//Require Models
const Habit = require("../models/Habits.model");
const User = require("../models/User.model");
const DailyHabit = require("../models/Daily.model");
const TodoItem = require("../models/Todo.model");

//require middleware
const { isLoggedIn, isLoggedOut } = require("../middleware/route-guard.js");

/* GET signup page */
router.get("/", (req, res, next) => {
  const currentUser = req.session.currentUser;
  if (req.session.currentUser) {
    res.redirect("/dashboard");
  } else {
    // User is logged out
    res.render("index", {
      userInSession: req.session.currentUser,
      errorMessage: null,
    });
  }
});

/* POST */
router.post(
  "/",
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

//GET user profile
router.get("/dashboard", isLoggedIn, async (req, res, next) => {
  try {
    const currentUser = req.session.currentUser;

    const habitList = await Habit.find({ user: currentUser._id });
    const dailyHabits = await DailyHabit.find({ user: currentUser._id });
    const todoItems = await TodoItem.find({ user: currentUser._id });

    res.render("users/dashboard", {
      userInSession: req.session.currentUser,
      habitList,
      dailyHabits,
      todoItems,
    });
  } catch (error) {
    console.log("There has been an error: ", error);
    res.status(500).send("Internal Server Error");
  }
});

//GET account
router.get("/account", isLoggedIn, async (req, res, next) => {
  const currentUser = req.session.currentUser;
  const changes = await User.find({ _id: currentUser._id });

  res.render("users/account", {
    userInSession: req.session.currentUser,
    changes,
  });
});

// EDIT Account
router.get("/account/:id/edit", isLoggedIn, async (req, res, next) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send("Invalid ID");
  }

  try {
    const changes = await User.findById(id);
    res.render("account/updateAccount", { changes });
  } catch (error) {
    console.log("There has been an error: ", error);
    res.status(500).send("Internal Server Error");
  }
});

router.post("/account/:id/edit", isLoggedIn, async (req, res, next) => {
  const { id } = req.params;
  const { username, email, password } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send("Invalid ID");
  }

  try {
    const updatedAccount = await User.findByIdAndUpdate(
      id,
      {
        username: username,
        email: email,
        password: password,
      },
      { new: true }
    );
    res.redirect("/account");
  } catch (error) {
    console.log("There has been an error: ", error);
    res.status(500).send("Internal Server Error");
  }
});

//DELETE Account
router.post("/account/:id/delete", isLoggedIn, async (req, res, next) => {
  const { id } = req.params;
  try {
    await User.findByIdAndDelete(id);
    res.clearCookie("connect.sid");
    req.session.destroy((err) => {
      if (err) next(err);
      res.redirect("/");
    });
  } catch (error) {
    console.log("There has been an error: ", error);
    res.redirect("/dashboard");
  }
});

//POST logout
router.post("/logout", isLoggedIn, (req, res) => {
  req.session.destroy((err) => {
    if (err) next(err);
    res.clearCookie("connect.sid");
    res.redirect("/");
  });
});

module.exports = router;
