// @desc    Logs request to console
const logger = (req, res, next) => {
  console.log(
    `[Spare Api] [${req.method}] ${
      req.protocol
    }://${req.get('host')}${req.originalUrl}`
  )
  next()
}

module.exports = logger
