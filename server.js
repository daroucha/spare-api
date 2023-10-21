const express = require('express')
const dotenv = require('dotenv')

// Load ENV Vars
dotenv.config({
  path: './config/config.env',
})

// Initialize App
const app = express()

const PORT = process.env.PORT || 8080

app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`))