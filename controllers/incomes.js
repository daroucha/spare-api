const ErrorResponse = require('../utils/errorResponse')
const asyncHandler = require('../middleware/async')
const Income = require('../models/Income')

// @desc    Get all incomes
// @route   GET /api/v1/incomes
// @access  Private
exports.getIncomes = asyncHandler(
  async (req, res, next) => {
    let query

    // Copy req.query
    const reqQuery = { ...req.query }

    // Fields to exclude for filtering
    const removeFields = ['select', 'sort', 'page', 'limit']

    // Loop over remove fields and delete them from request query
    removeFields.forEach((param) => delete reqQuery[param])

    // Create query string
    let queryStr = JSON.stringify(reqQuery)

    // Create operators ($gt, $gte, etc)
    queryStr = queryStr.replace(
      /\b(gt|gte|lt|lte|in)\b/g,
      (match) => `$${match}`
    )

    // Finding resource
    query = Income.find(JSON.parse(queryStr))

    // Select fields
    if (req.query.select) {
      const fields = req.query.select.split(',').join(' ')
      query = query.select(fields)
    }

    // Sort
    if (req.query.sort) {
      const sortBy = req.query.sort.split(',').join(' ')
      query = query.sort(sortBy)
    } else {
      query = query.sort('-createdAt')
    }

    // Pagination
    const page = parseInt(req.query.page, 10) || 1
    const limit = parseInt(req.query.limit, 10) || 10
    const startIndex = (page - 1) * limit
    const endIndex = page * limit
    const total = await Income.countDocuments()

    query = query.skip(startIndex).limit(limit)

    // Executing query
    const incomes = await query

    // Pagination result
    const pagination = {}

    if (endIndex < total) {
      pagination.next = {
        page: page + 1,
        limit,
      }
    }

    if (startIndex > 0) {
      pagination.prev = {
        page: page - 1,
        limit,
      }
    }

    res.status(200).json({
      success: true,
      count: incomes.length,
      pagination,
      data: incomes,
    })
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
    const income = await Income.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    )

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
  }
)

// @desc    Delete income
// @route   DELETE /api/v1/incomes/:id
// @access  Private
exports.deleteIncome = asyncHandler(
  async (req, res, next) => {
    const income = await Income.findByIdAndDelete(
      req.params.id
    )

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
      data: {},
    })
  }
)
