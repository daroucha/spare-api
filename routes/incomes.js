const express = require('express')
const {
  getIncomes,
  getIncome,
  createIncome,
  updateIncome,
  deleteIncome,
} = require('../controllers/incomes')

const Income = require('../models/Income')
const advancedResults = require('../middleware/advancedResults')

const router = express.Router()

const { protect } = require('../middleware/auth')

router
  .route('/')
  .get(protect, advancedResults(Income), getIncomes)
  .post(protect, createIncome)

router
  .route('/:id')
  .get(protect, getIncome)
  .put(protect, updateIncome)
  .delete(protect, deleteIncome)

module.exports = router
