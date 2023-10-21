const express = require('express')
const {
  getIncomes,
  getIncome,
  createIncome,
  updateIncome,
  deleteIncome,
} = require('../controllers/incomes')

const router = express.Router()

router
  .route('/')
  .get(getIncomes)
  .post(createIncome)

router
  .route('/:id')
  .get(getIncome)
  .put(updateIncome)
  .delete(deleteIncome)

module.exports = router
