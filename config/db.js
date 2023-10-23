const mongoose = require('mongoose')

const connectDB = async () => {
  const conn = await mongoose.connect(process.env.MONGO_URI)

  console.log(
    `[SpareAPI] MongoDB Connected: ${conn.connection.host}`
      .cyan.bold
  )
}

module.exports = connectDB
