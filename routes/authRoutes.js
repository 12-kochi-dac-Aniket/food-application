const express = require ('express')
const { registerController, loginController } = require('../controllers/authControllers')

const router = express.Router()

//rou
//reg post
router.post('/register',registerController)
router.post('/login',loginController)

//login post


module.exports = router