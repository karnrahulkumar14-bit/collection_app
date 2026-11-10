const {Schema, model} = require("mongoose");

const expensesSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
});

const Expenses = new model("Expenses",expensesSchema);

module.exports = Expenses;