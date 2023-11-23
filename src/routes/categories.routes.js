const express = require('express')
const {
  getCategories,
  getCategory,
  createCategory,
  updateCategory,
  deleteCategory,
} = require('../controllers/categories.controller')

const Category = require('../models/Category')
const advancedResults = require('../middleware/advancedResults.middleware')

// Include other resource routers
const expenseRouter = require('./expenses')

const router = express.Router()

// Re-route into other resource routers
router.use('/:categoryId/expenses', expenseRouter)

const {
  protect,
  authorize,
} = require('../middleware/auth.middleware')

router
  .route('/')
  .get(
    protect,
    authorize('user', 'watcher'),
    advancedResults(Category),
    getCategories
  )
  .post(protect, authorize('user'), createCategory)

router
  .route('/:id')
  .get(protect, authorize('user', 'watcher'), getCategory)
  .put(protect, authorize('user'), updateCategory)
  .delete(protect, authorize('user'), deleteCategory)

module.exports = router
