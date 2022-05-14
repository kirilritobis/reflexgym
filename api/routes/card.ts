const express = require('express')

const router = express.Router()
// Controller
const CardCtrl = require('../controllers/card.controller')()

// Middlewares
import { verifyToken } from '../middlewares/auth.middleware'

router.route('/:cardId')
    .get(verifyToken, CardCtrl.getCardData)

router.route('/detailsByUser/:cardNumber')
    .get(/*verifyToken,*/ CardCtrl.getCardByUserUid)

// TODO Another API for the dialog

module.exports = router