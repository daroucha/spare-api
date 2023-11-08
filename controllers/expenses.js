const ErrorResponse = require('../utils/errorResponse')
const asyncHandler = require('../middleware/async')
const Expense = require('../models/Expense')

// @desc    Get all expenses
// @route   GET /api/v1/expenses
// @access  Private
exports.getExpenses = asyncHandler(
  async (req, res, next) => {
    res.status(200).json(res.advancedResults)
  }
)

// @desc    Get single expense
// @route   GET /api/v1/expenses/:id
// @access  Private
exports.getExpense = asyncHandler(
  async (req, res, next) => {
    const expense = await Expense.findById(req.params.id)

    if (!expense) {
      return next(
        new ErrorResponse(
          `Expense not found with id of ${req.params.id}`,
          404
        )
      )
    }

    res.status(200).json({
      success: true,
      data: expense,
    })
  }
)

// @desc    Create new expense
// @route   POST /api/v1/expenses
// @access  Private
exports.createExpense = asyncHandler(
  async (req, res, next) => {
    // Add user to req.body
    req.body.user = req.user.id

    const expense = await Expense.create(req.body)

    res.status(201).json({
      success: true,
      data: expense,
    })
  }
)

// @desc    Update expense
// @route   PUT /api/v1/expenses/:id
// @access  Private
exports.updateExpenses = asyncHandler(
  async (req, res, next) => {
    let expense = await Expense.findById(req.params.id)

    if (!expense) {
      return next(
        new ErrorResponse(
          `Expense not found with id of ${req.params.id}`,
          404
        )
      )
    }

    // Make sure user is expense owner
    if (expense.user.toString() !== req.user.id) {
      return next(
        new ErrorResponse(
          `User ${req.params.id} is not authorized to update this expense`,
          401
        )
      )
    }

    expense = await Expense.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    )

    res.status(200).json({
      success: true,
      data: expense,
    })
  }
)

// @desc    Delete expense
// @route   DELETE /api/v1/expenses/:id
// @access  Private
exports.deleteExpense = asyncHandler(
  async (req, res, next) => {
    const expense = await Expense.findById(req.params.id)

    if (!expense) {
      return next(
        new ErrorResponse(
          `Expense not found with id of ${req.params.id}`,
          404
        )
      )
    }

    // Make sure user is expense owner
    if (expense.user.toString() !== req.user.id) {
      return next(
        new ErrorResponse(
          `User ${req.params.id} is not authorized to delete this expense`,
          401
        )
      )
    }

    expense.deleteOne()

    res.status(200).json({
      success: true,
      data: {},
    })
  }
)
