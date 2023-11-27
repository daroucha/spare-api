const express = require('express')
const dotenv = require('dotenv')
const morgan = require('morgan')
const colors = require('colors')
const cookieParser = require('cookie-parser')
const mongoSanitize = require('express-mongo-sanitize')
const helmet = require('helmet')
const xss = require('xss-clean')
const rateLimit = require('express-rate-limit')
const hpp = require('hpp')
const cors = require('cors')

const errorHandler = require('./middleware/error.middleware')

// Load ENV Vars
dotenv.config({
  path: './src/config/config.env',
})

// Route files
const auth = require('./routes/auth.routes')
const incomes = require('./routes/incomes.routes')
const expenses = require('./routes/expenses.routes')
const categories = require('./routes/categories.routes')

// Initialize App
const app = express()

// Body req parser
app.use(express.json())

// Cookie parser
app.use(cookieParser())

// Dev logging middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

// Sanitize data
app.use(mongoSanitize())

// Set security headers
app.use(helmet())

// Prevent XSS attacks
app.use(xss())

// Rate limiting
const limiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 minutes
  max: 100,
})
app.use(limiter)

// Prevent http param pollution
app.use(hpp())

// Enable CORS
app.use(cors())

// Mount routers
app.use('/api/v1/auth', auth)
app.use('/api/v1/incomes', incomes)
app.use('/api/v1/expenses', expenses)
app.use('/api/v1/categories', categories)

// Error handler middleware
app.use(errorHandler)

module.exports = app
