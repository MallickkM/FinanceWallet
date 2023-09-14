const mongoose = require("mongoose");

const budgetSchema = new mongoose.Schema({
  userid: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: [true, "Amount is required"],
  },
  categories: {
    food: Number,
    bills: Number,
    travelling: Number,
    healthCare: Number,
    misc: Number,
    // ... other categories
  },

}, { timestamps: true });

const budgetModel = mongoose.model("budgets", budgetSchema);

module.exports = budgetModel;