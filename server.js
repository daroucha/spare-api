const express = require('express')
const dotenv = require('dotenv')
const morgan = require('morgan')
const colors = require('colors')

const errorHandler = require('./middleware/error')
const connectDB = require('./config/db')

// Load ENV Vars
dotenv.config({
  path: './config/config.env',
})

// Connect to database
connectDB()

// Route files
const incomes = require('./routes/incomes')

// Initialize App
const app = express()

// Body req parser
app.use(express.json())

// Dev logging middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

// Mount routers
app.use('/api/v1/incomes', incomes)

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
process.on(
  'unhandledRejection',
  (err, promise) => {
    console.log(
      `[SpareAPI] Error: ${err.message}`.red.bold
    )

    // Close server & exit process
    server.close(() => process.exit(1))
  }
)
