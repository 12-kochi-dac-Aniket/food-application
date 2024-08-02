const express = require ('express')
const { testUserController } = require('../controllers/testController')

//rou obj
const router = express.Router()

// rou get, post, del ,upd
router.get('/test-user',testUserController);



module.exports= router