const { Schema, model } = require("mongoose");

const dailySchema = new Schema({
  name: String,
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

const DailyHabit = model("DailyHabit", dailySchema);

module.exports = DailyHabit;
