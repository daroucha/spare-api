const express = require('express')
const {
  getExpenses,
  getExpense,
  createExpense,
  updateExpenses,
  deleteExpense,
} = require('../controllers/expenses.controller')

const Expense = require('../models/Expense')
const advancedResults = require('../middleware/advancedResults')

const router = express.Router({ mergeParams: true })

const { protect, authorize } = require('../middleware/auth')

router
  .route('/')
  .get(
    protect,
    authorize('user', 'watcher'),
    advancedResults(Expense),
    getExpenses
  )
  .post(protect, authorize('user'), createExpense)

router
  .route('/:id')
  .get(protect, authorize('user', 'watcher'), getExpense)
  .put(protect, authorize('user'), updateExpenses)
  .delete(protect, authorize('user'), deleteExpense)

module.exports = router
