const transactionModel = require('../models/transactionModel');
const budgetModel = require('../models/budgetModel');
const jwt = require('jsonwebtoken');
const moment = require('moment');
require("dotenv").config();


const getAllTransaction = async (req, res) => {
    try {
        const {frequency, selectedDate, type} = req.body //filters
        let dateFilter = {};

        if (frequency === 'custom') {
            if (selectedDate.length === 2) {
                dateFilter = {
                    date: {
                        $gte: selectedDate[0],
                        $lte: selectedDate[1]
                    }
                };
            }
        } else {
            dateFilter = {
                date: {
                    $gt: moment().subtract(Number(frequency), "d").toDate()
                }
            };
        }

        const allthetransactions = await transactionModel.find({
            ...dateFilter,
            userid: req.body.userid,
            ...(type !== 'all' && {type})
        });

        res.status(200).json(allthetransactions);

    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
};


const deleteTransaction = async (req, res) => {
    try {
        const transactionId = req.body.transactionId;
        
        // Step 1: Find the transaction first
        const transaction = await transactionModel.findById(transactionId);

        // Step 2: Check if the transaction exists
        if (!transaction) {
            return res.status(404).send('Transaction not found.');
        }

        // Step 3: Delete the transaction
        await transactionModel.findByIdAndDelete(transactionId);

        // Step 4: Send a success message
        res.status(200).send('Transaction Deleted');

    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
}


const editTransaction = async (req, res) => {
    try {
        await transactionModel.findOneAndUpdate(
            { _id: req.body.transactionId },
            req.body.payload
        );
        res.status(200).send("Edit Successfully!");

    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }

}

const addTransaction = async (req, res) => {
    try {
        console.log("Request Body:", req.body);

        const newTransaction = new transactionModel(req.body);
        await newTransaction.save();
        console.log("Transaction Saved:", newTransaction);

        try {
            if (req.body.type === "expense") {
                console.log("Inside expense block"); // NEW
                const category = req.body.category.toLowerCase();
                console.log("Category:", category); // NEW
                const fieldToUpdate = `categories.${category}`;
                console.log("Field to update:", fieldToUpdate); // NEW
                
                const updatedBudget = await budgetModel.findOneAndUpdate(
                    { userid: req.body.userid },
                    { $inc: { [fieldToUpdate]: -req.body.amount } }
                );
                console.log("Updated budget:", updatedBudget); // NEW
                console.log("Budget related done"); // Your existing log
            }
            
        } catch (error) {
            console.error("Error updating the budget:", error);
        }

        // If the transaction type is 'income', you can adjust the budget accordingly if needed
        // For instance, if you want to increase the overall budget:
        if (req.body.type === "income") {
            await budgetModel.findOneAndUpdate(
                { userid: req.body.userid },
                { $inc: { 'amount': req.body.amount } }
            );
        }
        
        res.status(201).send("Transaction Created")

        

    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
};


  
module.exports = {getAllTransaction, addTransaction, editTransaction, deleteTransaction}