const express = require('express')
const {
  getCategories,
  getCategory,
  createCategory,
  updateCategory,
  deleteCategory,
} = require('../controllers/categories')

const Category = require('../models/Category')
const advancedResults = require('../middleware/advancedResults')

const router = express.Router()

const { protect, authorize } = require('../middleware/auth')

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
