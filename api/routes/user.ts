const express = require('express')

const router = express.Router()

// Controller
const UserCtrl = require('../controllers/user.controller')()

// Middlewares
import { verifyToken } from '../middlewares/auth.middleware'

router.route('/getAll')
    .get(verifyToken, UserCtrl.getAll)

router.route('/:userUid')
    .get(verifyToken, UserCtrl.getUserByUid)

module.exports = router