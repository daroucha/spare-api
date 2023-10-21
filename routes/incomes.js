const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
  res
    .status(200)
    .json({
      success: true,
      msg: `Show all incomes`
    })
})

router.get('/:id', (req, res) => {
  res
    .status(200)
    .json({
      success: true,
      msg: `Show income ${req.params.id}`
    })
})

router.post('/', (req, res) => {
  res
    .status(200)
    .json({
      success: true,
      msg: `Create a new income`
    })
})

router.put('/:id', (req, res) => {
  res
    .status(200)
    .json({
      success: true,
      msg: `Update income ${req.params.id}`
    })
})

router.delete('/:id', (req, res) => {
  res
    .status(200)
    .json({
      success: true,
      msg: `Delete income ${req.params.id}`
    })
})

module.exports = router