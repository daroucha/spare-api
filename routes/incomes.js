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

router
  .route('/')
  .get(advancedResults(Income), getIncomes)
  .post(createIncome)

router
  .route('/:id')
  .get(getIncome)
  .put(updateIncome)
  .delete(deleteIncome)

module.exports = router
