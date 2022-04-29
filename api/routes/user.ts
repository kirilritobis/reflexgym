const express = require('express')

const router = express.Router()

// Controller
const UserCtrl = require('../controllers/user.controller')()

// Middlewares
import { verifyToken } from '../middlewares/auth.middleware'

router.route('/getAll')
    .get(verifyToken, UserCtrl.getAll)

module.exports = router