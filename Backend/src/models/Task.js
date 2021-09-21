const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const taskScheme = new Schema({
  id: String,
  text: String,
  isCheck: Boolean
});

module.exports = Task = mongoose.model("tasks", taskScheme);


