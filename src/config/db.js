const mongoose = require('mongoose')

const connectDB = async (mongoURI) => {
  try {
    const conn = await mongoose.connect(mongoURI)

    console.log(
      `[SpareAPI] MongoDB Connected: ${conn.connection.host}`
        .bold.blue
    )
  } catch (err) {
    console.error(
      '[SpareAPI] Error connecting to MongoDB:',
      err.message
    )
    process.exit(1)
  }
}

const disconnectDB = async () => {
  try {
    await mongoose.disconnect()
    console.log('[SpareAPI] MongoDB Disconnected'.bold.blue)
  } catch (err) {
    console.error(
      '[SpareAPI] Error disconnecting from MongoDB:',
      err.message
    )
    process.exit(1)
  }
}

module.exports = { connectDB, disconnectDB }
