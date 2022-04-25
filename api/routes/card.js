const express = require('express')

const router = express.Router()
// Controller
const CardCtrl = require('../controllers/card.controller')()

router.route('/:cardId')
    .get(CardCtrl.getCardData)

router.route('/detailsByUser/:userUid')
    .get(CardCtrl.getCardByUserUid)


module.exports = router