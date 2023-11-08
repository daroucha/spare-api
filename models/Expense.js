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
    // Billing date will work as a start date in case of recurrent expenses
    billingDate: {
      type: Date,
      default: Date.now,
    },
    // A recurrent expense could be installments, bills or subscriptions
    recurrence: {
      status: {
        type: Boolean,
        default: false,
      },
      type: {
        type: String,
        enum: ['installment', 'bill', 'subscription'],
      },
    },
    // For installments
    fraction: {
      status: {
        type: Boolean,
        default: false,
      },
      // Current will be calculated on client base on billingDate (as start date) and fraction.total (as end date)
      // Total months
      total: {
        type: Number,
        max: [800, 'Too much months'],
        min: [1, 'Not enough months'],
      },
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
