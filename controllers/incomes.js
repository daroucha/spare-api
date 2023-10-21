// @desc    Get all incomes
// @route   GET /api/v1/incomes
// @access  Private
exports.getIncomes = (req, res, next) => {
  res.status(200).json({
    success: true,
    msg: `Show all incomes`,
  })
}

// @desc    Get single income
// @route   GET /api/v1/incomes/:id
// @access  Private
exports.getIncome = (req, res, next) => {
  res.status(200).json({
    success: true,
    msg: `Show income ${req.params.id}`,
  })
}

// @desc    Create new income
// @route   POST /api/v1/incomes
// @access  Private
exports.createIncome = (req, res, next) => {
  res.status(200).json({
    success: true,
    msg: `Create a new income`,
  })
}

// @desc    Update income
// @route   PUT /api/v1/incomes/:id
// @access  Private
exports.updateIncome = (req, res, next) => {
  res.status(200).json({
    success: true,
    msg: `Update income ${req.params.id}`,
  })
}

// @desc    Delete income
// @route   DELETE /api/v1/incomes/:id
// @access  Private
exports.deleteIncome = (req, res, next) => {
  res.status(200).json({
    success: true,
    msg: `Delete income ${req.params.id}`,
  })
}
