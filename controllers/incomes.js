const Income = require('../models/Income')

// @desc    Get all incomes
// @route   GET /api/v1/incomes
// @access  Private
exports.getIncomes = async (req, res, next) => {
  try {
    const incomes = await Income.find()

    res.status(200).json({
      success: true,
      count: incomes.length,
      data: incomes,
    })
  } catch (err) {
    res.status(400).json({
      success: false,
    })
  }
}

// @desc    Get single income
// @route   GET /api/v1/incomes/:id
// @access  Private
exports.getIncome = async (req, res, next) => {
  try {
    const income = await Income.findById(
      req.params.id
    )

    if (!income) {
      return res.status(400).json({
        success: false,
      })
    }

    res.status(200).json({
      success: true,
      data: income,
    })
  } catch (err) {
    res.status(400).json({
      success: false,
    })
  }
}

// @desc    Create new income
// @route   POST /api/v1/incomes
// @access  Private
exports.createIncome = async (req, res, next) => {
  try {
    const income = await Income.create(req.body)

    res.status(201).json({
      success: true,
      data: income,
    })
  } catch (err) {
    res.status(400).json({
      success: false,
    })
  }
}

// @desc    Update income
// @route   PUT /api/v1/incomes/:id
// @access  Private
exports.updateIncome = async (req, res, next) => {
  try {
    const income = await Income.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    )

    if (!income) {
      return res.status(400).json({
        success: false,
      })
    }

    res.status(200).json({
      success: true,
      data: income,
    })
  } catch (err) {
    return res.status(400).json({
      success: false,
    })
  }
}

// @desc    Delete income
// @route   DELETE /api/v1/incomes/:id
// @access  Private
exports.deleteIncome = async (req, res, next) => {
  try {
    const income = await Income.findByIdAndDelete(
      req.params.id
    )

    if (!income) {
      return res.status(400).json({
        success: false,
      })
    }

    res.status(200).json({
      success: true,
      data: {},
    })
  } catch (err) {
    return res.status(400).json({
      success: false,
    })
  }
}
