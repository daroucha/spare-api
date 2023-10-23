const ErrorResponse = require('../utils/errorResponse')
const asyncHandler = require('../middleware/async')
const Income = require('../models/Income')

// @desc    Get all incomes
// @route   GET /api/v1/incomes
// @access  Private
exports.getIncomes = asyncHandler(
  async (req, res, next) => {
    res.status(200).json(res.advancedResults)
  }
)

// @desc    Get single income
// @route   GET /api/v1/incomes/:id
// @access  Private
exports.getIncome = asyncHandler(async (req, res, next) => {
  const income = await Income.findById(req.params.id)

  if (!income) {
    return next(
      new ErrorResponse(
        `Income not found with id of ${req.params.id}`,
        404
      )
    )
  }

  res.status(200).json({
    success: true,
    data: income,
  })
})

// @desc    Create new income
// @route   POST /api/v1/incomes
// @access  Private
exports.createIncome = asyncHandler(
  async (req, res, next) => {
    // Add user to req.body
    req.body.user = req.user.id

    const income = await Income.create(req.body)

    res.status(201).json({
      success: true,
      data: income,
    })
  }
)

// @desc    Update income
// @route   PUT /api/v1/incomes/:id
// @access  Private
exports.updateIncome = asyncHandler(
  async (req, res, next) => {
    let income = await Income.findById(req.params.id)

    if (!income) {
      return next(
        new ErrorResponse(
          `Income not found with id of ${req.params.id}`,
          404
        )
      )
    }

    // Make sure user is income owner
    if (income.user.toString() !== req.user.id) {
      return next(
        new ErrorResponse(
          `User ${req.params.id} is not authorized to update this income`,
          401
        )
      )
    }

    income = await Income.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    )

    res.status(200).json({
      success: true,
      data: income,
    })
  }
)

// @desc    Delete income
// @route   DELETE /api/v1/incomes/:id
// @access  Private
exports.deleteIncome = asyncHandler(
  async (req, res, next) => {
    const income = await Income.findById(req.params.id)

    if (!income) {
      return next(
        new ErrorResponse(
          `Income not found with id of ${req.params.id}`,
          404
        )
      )
    }

    // Make sure user is income owner
    if (income.user.toString() !== req.user.id) {
      return next(
        new ErrorResponse(
          `User ${req.params.id} is not authorized to delete this income`,
          401
        )
      )
    }

    income.remove()

    res.status(200).json({
      success: true,
      data: {},
    })
  }
)
