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

    // TODO be finished
    async function getAllUsersCards (req, res) {
        try {
            const result = await CardsModel.getAllUsersCards()
            res.send(result)
        } catch (err) {
            logger.error('%o', err)
            return errorhandler.sendError(err, req, res)
        }
    }
    
    return {
        getCardData,
        getAllUsersCards
    }
}
