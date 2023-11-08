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

// Calculate endDate from billingDate and fraction total
ExpenseSchema.virtual('endDate').get(function () {
  if (!this.recurrence.status) {
    return this.billingDate
  }

  const startDate = new Date(this.billingDate)

  const endDate = startDate.setMonth(
    startDate.getMonth() + this.recurrence.total
  )

  return new Date(endDate)
})

// Calculate current installment from billingDate and current date
ExpenseSchema.virtual('recurrence.current').get(
  function () {
    const dateTo = new Date()
    const dateFrom = this.billingDate

    return (
      dateTo.getMonth() -
      dateFrom.getMonth() +
      12 * (dateTo.getFullYear() - dateFrom.getFullYear())
    )
  }
)

// Create expense slug from the name
ExpenseSchema.pre('save', function (next) {
  this.slug = slugify(this.name, { lower: true })
  next()
})

module.exports = mongoose.model('Expense', ExpenseSchema)
