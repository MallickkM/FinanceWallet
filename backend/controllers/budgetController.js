const budgetModel = require("../models/budgetModel");
const jwt = require('jsonwebtoken');
const moment = require('moment');
require("dotenv").config();
  

const getAllBudget = async (req, res) => {
  try {
    const budget = await budgetModel.find({ userid: req.body.userid});
    res.status(200).json(budget);
  } catch (error) {
      console.log(error);
      res.status(500).json(error);
  }
}

const deleteBudget = async (req, res) => {
  try {
      const budgetId = req.body.budgetId;
      
      // Step 1: Find the transaction first
      const budget = await budgetModel.findById(budgetId);

      // Step 2: Check if the transaction exists
      if (!budget) {
          return res.status(404).send('Budget not found.');
      }

      // Step 3: Delete the transaction
      await budgetModel.findByIdAndDelete(budgetId);

      // Step 4: Send a success message
      res.status(200).send('Budget Deleted');

  } catch (error) {
      console.log(error);
      res.status(500).json(error);
  }
}

const editBudget = async (req, res) => {
  try {
    await budgetModel.findByIdAndUpdate(
      {
        _id: req.body.budgetId 
      },
      req.body.payload
    );
    res.status(200).send("Budget Edited Successfully!");
  } catch (error) {
      console.log(error);
      res.status(500).json(error);
  }
}

const addBudget = async (req, res) => {
  try {
    console.log("Request Body:", req.body);

    const newBudget = new budgetModel(req.body);
    await newBudget.save();
    console.log("Budget Saved:", newBudget); 
    res.status(201).send("Budget Created");
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

  
module.exports = {addBudget, getAllBudget, editBudget, deleteBudget}