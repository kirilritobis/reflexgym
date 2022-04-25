// Models
const CardsModel = require('../models/card.model')()

const logger = require('../utils/loggers/common.logger')
const errorhandler = require('../helpers/errorHandler')()

module.exports = function CardController () {
    async function getCardData (req, res) {
        try {
            const cardId = req.params.cardId
            const card = await CardsModel.getCardData(cardId)
            res.send(card)
        } catch (err) {
            logger.error('%o', err)
            return errorhandler.sendError(err, req, res)
        }
    }

    async function getCardByUserUid (req, res) {
        try {
            const userUid = Number(req.params.userUid)
            const card = await CardsModel.getCardByUserUid(userUid)
            res.send(card)
        } catch (err) {
            logger.error('%o', err)
            return errorhandler.sendError(err, req, res)
        }
    }
    
    return {
        getCardData,
        getCardByUserUid
    }
}
