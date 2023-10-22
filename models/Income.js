const mongoose = require('mongoose')
const slugify = require('slugify')

const IncomeSchema = new mongoose.Schema({
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
  recurrence: {
    status: {
      type: Boolean,
      default: false,
    },
    date: {
      type: Date,
      default: Date.now,
    },
  },
  date: {
    type: Date,
    default: Date.now,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

// Create income slug from the name
IncomeSchema.pre('save', function (next) {
  this.slug = slugify(this.name, { lower: true })
  next()
})

module.exports = mongoose.model('Income', IncomeSchema)
