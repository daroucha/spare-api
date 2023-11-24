const User = require('../models/User')

async function createUser({ name, email, password, role }) {
  return await User.create({
    name,
    email,
    password,
    role,
  })
}

module.exports = createUser
