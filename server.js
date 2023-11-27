const app = require('./src/app')
const { connectDB } = require('./src/config/db')

// Connect to database
connectDB(process.env.MONGO_URI)

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

module.exports = app
