const express = require("express");
const { addTransaction, getAllTransaction, editTransaction, deleteTransaction } = require("../controllers/transactionController"); // Import functions from controller

//router object
const router = express.Router();

//routes
//add transaction POST METHOD
router.post('/add-transaction', addTransaction);

//edit transaction POST METHOD
router.post('/edit-transaction', editTransaction);

//delete transaction POST METHOD
router.post('/delete-transaction', deleteTransaction);

//get transactions
router.post('/get-transactions', getAllTransaction);

module.exports = router;