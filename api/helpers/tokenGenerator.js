const jwt = require('jsonwebtoken')

const CardSchema = require('../schemas/card.schema')

async function generateTokens (user) {
    try {
        const q = {
            user: user.uId
        }
        const card = await CardSchema.findOne(q)
        const accessTokenData = {
            email: user.email,
            cardNumber: card.uId,
            userId: user.uId
        }
        const accessToken = jwt.sign( accessTokenData, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '7d'})
        const refreshToken = jwt.sign( { email: user.email }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '7d'})
        return { accessToken: accessToken, refreshToken: refreshToken }
    } catch (err) {
        logger.error('%o', err)
        // return errorhandler.sendError(err, req, res)
        return err
    }
}

module.exports = {
    generateTokens
}