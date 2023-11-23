const ErrorResponse = require('../utils/errorResponse')
const asyncHandler = require('../middleware/async.middleware')
const Debt = require('../models/Debt')

// @desc    Get all debts
// @route   GET /api/v1/debts
// @access  Private
exports.getDebts = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults)
})

// @desc    Get single debt
// @route   GET /api/v1/debts/:id
// @access  Private
exports.getDebt = asyncHandler(async (req, res, next) => {
  const debt = await Debt.findById(req.params.id)

  if (!debt) {
    return next(
      new ErrorResponse(
        `Debt not found with id of ${req.params.id}`,
        404
      )
    )
  }

  res.status(200).json({
    success: true,
    data: debt,
  })
})
