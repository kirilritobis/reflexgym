const passport = require('../boot/passport')

const CardSchema = require('../schemas/card.schema')

module.exports = function CardModel () {
    // Auth routes
    async function getCardData (cardId) {
        try {
            const q = {
                uId: cardId
            }
            return await CardSchema.findOne(q)
        } catch (error) {
            throw error
        }
    }

    // TODO be finished
    async function getAllUsersCards () {
        try {
            return await CardSchema.aggregate([
                {
                    $lookup: {
                        from: 'users',
                        localField: 'user',
                        foreignField: 'uId',
                        as: 'userData'
                    }
                }])
        } catch (err) {
            throw err
        }
    }

    // TODO be finished
    async function getCardDetails () {
        try {
            return await CardSchema.aggregate([
                {
                    $lookup: {
                        from: 'users',
                        localField: 'user',
                        foreignField: 'uId',
                        as: 'userData'
                    }
                }])
        } catch (err) {
            throw err
        }
    }

    return {
        getCardData,
        getAllUsersCards,
        getCardDetails
    }
}
