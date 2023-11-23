const express = require('express')
const {
  getIncomes,
  getIncome,
  createIncome,
  updateIncome,
  deleteIncome,
} = require('../controllers/incomes.controller')

const Income = require('../models/Income')
const advancedResults = require('../middleware/advancedResults')

const router = express.Router()

const { protect, authorize } = require('../middleware/auth')

router
  .route('/')
  .get(
    protect,
    authorize('user', 'watcher'),
    advancedResults(Income),
    getIncomes
  )
  .post(protect, authorize('user'), createIncome)

router
  .route('/:id')
  .get(protect, authorize('user', 'watcher'), getIncome)
  .put(protect, authorize('user'), updateIncome)
  .delete(protect, authorize('user'), deleteIncome)

module.exports = router
