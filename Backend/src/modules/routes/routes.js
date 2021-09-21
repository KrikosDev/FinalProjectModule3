const express = require('express');
const router = express.Router();

const {
  getAllExpenses,
  createNewExpenses,
  changeExpensesInfo,
  deleteExpenses,
} = require('../controllers/expenses.controller');

// Tasks routes
router.get('/allExpenses', getAllExpenses);
router.post('/createExpenses', createNewExpenses);
router.patch('/updateExpenses', changeExpensesInfo)
router.delete('/deleteExpenses', deleteExpenses);

//User routes

module.exports = router;