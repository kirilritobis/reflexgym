const jwt = require('jsonwebtoken')

function generateTokens (user) {
    try {
        const accessToken = jwt.sign( { email: user.email }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '60s'})
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