const express = require('express')
const {
  register,
  login,
  getMe,
  forgotPassword,
  resetPassword,
  updateDetails,
  updatePassword,
  logout,
} = require('../controllers/auth.controller')

const router = express.Router()

const { protect } = require('../middleware/auth.middleware')

router.post('/register', register)
router.post('/login', login)
router.get('/logout', logout)
router.get('/me', protect, getMe)
router.put('/updatedetails', protect, updateDetails)
router.put('/updatepassword', protect, updatePassword)
router.post('/forgotpassword', forgotPassword)
router.put('/resetpassword/:resettoken', resetPassword)

module.exports = router
