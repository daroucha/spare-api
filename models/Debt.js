const mongoose = require('mongoose')

const DebtSchema = new mongoose.Schema(
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
    amount: {
      type: Number,
      required: [true, 'Please add a amount'],
      min: [1, 'Amount must be at least 1'],
    },
    status: {
      type: Boolean,
      default: false,
    },
    dueDate: {
      type: Date,
      default: Date.now,
    },
    fees: {
      status: Boolean,
      amount: Number,
      type: {
        type: String,
        enum: ['compound', 'simple'],
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

// Calculate fees
DebtSchema.virtual('finalAmount').get(function () {
  return this.amount
})

module.exports = mongoose.model('Debt', DebtSchema)
