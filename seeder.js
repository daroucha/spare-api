const fs = require('fs')
const mongoose = require('mongoose')
const colors = require('colors')
const dotenv = require('dotenv')

// Load env vars
dotenv.config({ path: './src/config/config.env' })

// Load models
const Income = require('./src/models/Income')

// Connect to DB
