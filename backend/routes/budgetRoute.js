const express = require("express");
const {
  addBudget,
  getAllBudget,
  editBudget,
  deleteBudget
 
} = require("../controllers/budgetController"); // Make sure you define these functions in your budgetController

//router object
const router = express.Router();

// Add budget - POST Method
router.post('/add-budget', addBudget);

// Edit budget - POST Method
router.post('/edit-budget', editBudget);

// Delete budget - POST Method
router.post('/delete-budget', deleteBudget);


// Get specific budget for a user - POST Method
router.post('/get-budget', getAllBudget);

module.exports = router;
