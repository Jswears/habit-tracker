const { Schema, model } = require("mongoose");

const todoSchema = new Schema({
  name: String,
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

const TodoItem = model("TodoItem", todoSchema);

module.exports = TodoItem;
