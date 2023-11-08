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

const errorHandler = require('./middleware/error')
const connectDB = require('./config/db')

// Load ENV Vars
dotenv.config({
  path: './config/config.env',
})

// Connect to database
connectDB()

// Route files
const auth = require('./routes/auth')
const incomes = require('./routes/incomes')
const expenses = require('./routes/expenses')

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

// Error handler middleware
app.use(errorHandler)

// Set port
const PORT = process.env.PORT || 8080

const server = app.listen(
  PORT,
  console.log(
    `[SpareAPI] Server running in ${process.env.NODE_ENV} mode on port ${PORT}`
      .bgWhite.black.bold
  )
)

// Handle 'unhandled' promise rejections
process.on('unhandledRejection', (err, promise) => {
  console.log(`[SpareAPI] Error: ${err.message}`.red.bold)

  // Close server & exit process
  server.close(() => process.exit(1))
})
