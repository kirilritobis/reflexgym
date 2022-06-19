const mongoose = require('mongoose')

// Models
const CardsModel = require('../models/card.model')()
const PlansModel = require('../models/card.model')()

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
            const cardNumber = Number(req.params.cardNumber)
            const card = await CardsModel.getCardByUserUid(cardNumber)
            res.send(card)
        } catch (err) {
            logger.error('%o', err)
            return errorhandler.sendError(err, req, res)
        }
    }

    async function markVisitation (req, res) {
        try {
            const cardNumber = Number(req.params.cardNumber)
            const card = await CardsModel.markVisitation(cardNumber)
            // const card = await CardsModel.getCardByUserUid(cardNumber)
            res.send(card)
        } catch (err) {
            logger.error('%o', err)
            return errorhandler.sendError(err, req, res)
        }
    }

    async function getAllPlans (req, res) {
        try {
            const card = await CardsModel.getAllPlans()
            res.send(card)
        } catch (err) {
            logger.error('%o', err)
            return errorhandler.sendError(err, req, res)
        }
    }

    async function loadCard (req, res) {
        try {
            const cardNumber = Number(req.params.cardNumber)
            let { planId } = req.body
            planId = mongoose.Types.ObjectId(planId)
            const card = await CardsModel.loadCard(cardNumber, planId)
            // const card = await CardsModel.getCardByUserUid(cardNumber)
            res.send(card)
        } catch (err) {
            logger.error('%o', err)
            return errorhandler.sendError(err, req, res)
        }
    }
    
    return {
        getCardData,
        getCardByUserUid,
        markVisitation,
        loadCard,
        getAllPlans
    }
}
