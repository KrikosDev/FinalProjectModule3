const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const expensesSchema = new Schema({
  id: String,
  name: String,
  price: Number,
  date: Date
});

module.exports = Expenses = mongoose.model("expenses", expensesSchema);



