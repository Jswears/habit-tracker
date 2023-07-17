const router = require("express").Router();
const mongoose = require("mongoose");

//Require Models
const Habit = require("../models/Habits.model");
const User = require("../models/User.model");
const DailyHabit = require("../models/Daily.model");
const TodoItem = require("../models/Todo.model");

//require middleware
const { isLoggedIn, isLoggedOut } = require("../middleware/route-guard.js");

/* GET home page */
router.get("/", (req, res, next) => {
  if (req.session.currentUser) {
    // User is logged in
    res.render("index", { isLoggedIn: true });
  } else {
    // User is logged out
    res.render("index", { isLoggedIn: false });
  }
});

//GET user profile
router.get("/userProfile", isLoggedIn, async (req, res, next) => {
  try {
    const currentUser = req.session.currentUser;

    const habitList = await Habit.find({ user: currentUser._id });
    const dailyHabits = await DailyHabit.find();
    const todoItems = await TodoItem.find();

    res.render("users/user-profile", {
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

//POST from userProfile
router.post("/userProfile", isLoggedIn, async (req, res, next) => {
  try {
    //Create new Habit
    const currentUser = req.session.currentUser;

    // console.log(currentUser);
    // console.log(req.body);
    const { name } = req.body;
    const newHabit = await Habit.create({
      name: name,
      user: currentUser._id,
    });
    res.redirect("/userProfile");
  } catch (error) {
    console.log("There has been an error: ", error);
  }
});

//DELETE HABIT
router.post("/userProfile/:id/delete", isLoggedIn, async (req, res, next) => {
  const { id } = req.params;
  try {
    await Habit.findByIdAndDelete(id);
    await DailyHabit.findByIdAndDelete(id);
    await TodoItem.findByIdAndDelete(id);
    res.redirect("/userProfile");
  } catch (error) {
    console.log("There has been an error: ", error);
  }
});

//EDIT HABIT
router.get("/userProfile/:id/edit", isLoggedIn, async (req, res, next) => {
  const { id } = req.params;

  const foundHabit = await Habit.findById(id);
  const foundDaily = await DailyHabit.findById(id);
  const foundTodo = await TodoItem.findById(id);
  res.render("habits/update-form", { foundHabit, foundDaily, foundTodo });
});

router.post("/userProfile/:id/edit", isLoggedIn, async (req, res, next) => {
  const { id } = req.params;
  const { name } = req.body;

  try {
    const updatedHabit = await Habit.findByIdAndUpdate(
      id,
      {
        name: name,
      },
      { new: true }
    );
    res.redirect("/userProfile");
  } catch (error) {
    console.log("There has been an error: ", error);
  }
});

// POST to add a daily habit
router.post("/userProfile/add-daily", isLoggedIn, async (req, res, next) => {
  try {
    const { name } = req.body;
    const currentUser = req.session.currentUser;

    const newDailyHabit = await DailyHabit.create({
      name,
      user: currentUser._id,
    });

    res.redirect("/userProfile");
  } catch (error) {
    console.log("There has been an error: ", error);
    res.status(500).send("Internal Server Error");
  }
});

//GET edit view

// POST to add a todo item
router.post("/userProfile/add-todo", isLoggedIn, async (req, res, next) => {
  try {
    const { name } = req.body;
    const currentUser = req.session.currentUser;

    const newTodoItem = await TodoItem.create({ name, user: currentUser._id });

    res.redirect("/userProfile");
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
    res.redirect("/userProfile");
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
