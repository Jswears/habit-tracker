const router = require("express").Router();
const { isLoggedIn } = require("../middleware/route-guard.js");
const Habit = require("../models/Habits.model");
const DailyHabit = require("../models/Daily.model");
const TodoItem = require("../models/Todo.model");

// CREATE HABIT
router.post("/habits/create", isLoggedIn, async (req, res, next) => {
  const { name } = req.body;
  const currentUser = req.session.currentUser;

  try {
    const newHabit = await Habit.create({
      name: name,
      user: currentUser._id,
    });
    res.redirect("/dashboard");
  } catch (error) {
    console.log("There has been an error: ", error);
  }
});

// EDIT HABIT
router.get("/habits/:id/edit", isLoggedIn, async (req, res, next) => {
  const { id } = req.params;

  try {
    const foundHabit = await Habit.findById(id);
    res.render("updateForms/update-form", { foundHabit: foundHabit });
  } catch (error) {
    console.log("There has been an error: ", error);
    next(error);
  }
});

router.post("/habits/:id/edit", isLoggedIn, async (req, res, next) => {
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
    res.redirect("/dashboard");
  } catch (error) {
    console.log("There has been an error: ", error);
  }
});

// DELETE HABIT
router.post("/habits/:id/delete", isLoggedIn, async (req, res, next) => {
  const { id } = req.params;
  try {
    await Habit.findByIdAndDelete(id);
    res.redirect("/dashboard");
  } catch (error) {
    console.log("There has been an error: ", error);
  }
});

// CREATE DAILY HABIT
router.post("/daily/create", isLoggedIn, async (req, res, next) => {
  const { name } = req.body;
  const currentUser = req.session.currentUser;

  try {
    const newDailyHabit = await DailyHabit.create({
      name: name,
      user: currentUser._id,
    });
    res.redirect("/dashboard");
  } catch (error) {
    console.log("There has been an error: ", error);
  }
});

// EDIT DAILY HABIT
router.get("/daily/:id/edit", isLoggedIn, async (req, res, next) => {
  const { id } = req.params;

  try {
    const foundDaily = await DailyHabit.findById(id);
    res.render("updateForms/update-form", { foundDaily: foundDaily });
  } catch (error) {
    console.log("There has been an error: ", error);
  }
});

router.post("/daily/:id/edit", isLoggedIn, async (req, res, next) => {
  const { id } = req.params;
  const { name } = req.body;

  try {
    const updatedDailyHabit = await DailyHabit.findByIdAndUpdate(
      id,
      {
        name: name,
      },
      { new: true }
    );
    res.redirect("/dashboard");
  } catch (error) {
    console.log("There has been an error: ", error);
  }
});

// DELETE DAILY HABIT
router.post("/daily/:id/delete", isLoggedIn, async (req, res, next) => {
  const { id } = req.params;
  try {
    await DailyHabit.findByIdAndDelete(id);
    res.redirect("/dashboard");
  } catch (error) {
    console.log("There has been an error: ", error);
  }
});

// CREATE TODO ITEM
router.post("/todo/create", isLoggedIn, async (req, res, next) => {
  const { name } = req.body;
  const currentUser = req.session.currentUser;

  try {
    const newTodoItem = await TodoItem.create({
      name: name,
      user: currentUser._id,
    });
    res.redirect("/dashboard");
  } catch (error) {
    console.log("There has been an error: ", error);
  }
});

// EDIT TODO ITEM
router.get("/todo/:id/edit", isLoggedIn, async (req, res, next) => {
  const { id } = req.params;

  try {
    const foundTodo = await TodoItem.findById(id);
    res.render("updateForms/update-form", { foundTodo: foundTodo });
  } catch (error) {
    console.log("There has been an error: ", error);
  }
});

router.post("/todo/:id/edit", isLoggedIn, async (req, res, next) => {
  const { id } = req.params;
  const { name } = req.body;

  try {
    const updatedTodoItem = await TodoItem.findByIdAndUpdate(
      id,
      {
        name: name,
      },
      { new: true }
    );
    res.redirect("/dashboard");
  } catch (error) {
    console.log("There has been an error: ", error);
  }
});

// DELETE TODO ITEM
router.post("/todo/:id/delete", isLoggedIn, async (req, res, next) => {
  const { id } = req.params;
  try {
    await TodoItem.findByIdAndDelete(id);
    res.redirect("/dashboard");
  } catch (error) {
    console.log("There has been an error: ", error);
  }
});

module.exports = router;
