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

    // TODO can be unified by search query with getAll
    async function getCardByUserUid (cardNumber) {
        try {
            const card = await CardSchema.aggregate([{
                $match: {
                    uId: cardNumber
                }
            },
            {
                $lookup:
                  {
                    from: 'users',
                    localField: 'user',
                    foreignField: 'uId',
                    as: 'userData'
                  }
             },
             {
                $unwind: {
                    path: '$userData',
                    // preserveNullAndEmptyArrays: true
                }
            },
            {
                $project: {
                    email: '$userData.email',
                    phone: '$userData.phone',
                    uId: '$userData.uId',
                    lastADLoginStatus: '$userData.lastADLoginStatus',
                    firstName: '$userData.firstName',
                    lastName: '$userData.lastName',
                    cardNumber: '$uId',
                    profilePic: { $concat: [`${process.env.URL}/`, '$userData.profilePic'] },
                    chargedOn: '$chargedOn',
                    expiresOn: '$expiresOn',
                    expired: {
                        $cond: {
                            if: {
                                $or: [
                                     {$lt: [new Date(Date.now()), '$chargedOn']},
                                     {$gt: [new Date(Date.now()), '$expiresOn']}
                                ]
                            },
                            then: true,
                            else: false
                        }
                    }
                }
            }
        ])
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
