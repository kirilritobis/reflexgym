const passport = require('../boot/passport')
const moment = require('moment')
const CardSchema = require('../schemas/card.schema')
const PlanSchema = require('../schemas/plan.schema')

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

    async function markVisitation (cardId) {
        try {
            const q = {
                uId: cardId
            }

            const card = await CardSchema.findOne(q)
            const date = new Date()
            if(card.byVisits) {
                if(card.remainingVisits > 0) {
                    card.remainingVisits--;
                } else {
                    throw new Error('Card Expired')
                }
            } else {
                if(card.expiresOn < date) {
                    throw new Error('Card Expired')
                }
            }

            await card.save()
            return card
        } catch (error) {
            throw error
        }
    }

    async function getAllPlans () {
        try {
            return await PlanSchema.find({})
        } catch (error) {
            throw error
        }
    }


    // async function loadCard (data) {
    //     try {
    //         const q = {
    //             uId: data.cardId
    //         }
    //         const card = await CardSchema.findOne(q)
    //         console.log('>>>', moment().format())
    //         // No such card
    //         if(data.visitations){
    //             card.visitations += Number(data.visitations)
    //         } else {
    //             console.log('FFFFFF', moment().add(5, 'days').calendar());
    //             // card.monts += Number(data.months)
    //         }
            
    //         await card.save()
    //         return card
    //     } catch (error) {
    //         throw error
    //     }
    // }

    return {
        getCardData,
        getCardByUserUid,
        markVisitation,
        // loadCard,
        getAllPlans
    }
}
