const express = require('express')
const dotenv = require('dotenv')

// Route files
const incomes = require('./routes/incomes')

// Load ENV Vars
dotenv.config({
  path: './config/config.env',
})

// Initialize App
const app = express()

// Mount routers
app.use('/api/v1/incomes', incomes)

const PORT = process.env.PORT || 8080

app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
)
