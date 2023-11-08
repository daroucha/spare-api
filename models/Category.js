const mongoose = require('mongoose')

const CategorySchema = new mongoose.Schema(
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
    // In percentage
    proportion: {
      type: Number,
      min: 1,
      max: 100,
    },
    // Hex color
    theme: String,
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

module.exports = mongoose.model('Category', CategorySchema)
