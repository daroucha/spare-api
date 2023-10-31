const mongoose = require('mongoose')
const slugify = require('slugify')

const ExpenseSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please add a name'],
      trim: true,
      maxlength: [
        80,
        'Name can not be more than 80 characters',
      ],
    },
    slug: String,
    amount: {
      type: Number,
      required: [true, 'Please add a amount'],
      min: [1, 'Amount must be at least 1'],
    },
    billingDate: {
      type: Date,
      default: Date.now,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
)

module.exports = mongoose.model('Expense', ExpenseSchema)
