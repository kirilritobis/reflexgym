// Models
const CardsModel = require('../models/card.model')()

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
            return await CardsModel.getAllUsersCards()
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
