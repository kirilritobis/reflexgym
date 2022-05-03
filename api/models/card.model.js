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
    async function getCardByUserUid (userUid) {
        try {
            const q = {
                user: userUid
            }
            const card = await CardSchema.findOne(q)
            if(!card){
                throw new Error('No such card')
            }
            return card
        } catch (err) {
            throw err
        }
    }

    return {
        getCardData,
        getCardByUserUid
    }
}
