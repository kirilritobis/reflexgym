// require('dotenv').config()

// const express = require('express')
// const app = express()
// const jwt = require('jsonwebtoken')

// app.use(express.json())

// let refreshTokens = []

// app.post('/token', (req, res) => {
//   const refreshToken = req.body.token
//   if (refreshToken == null) return res.sendStatus(401)
//   if (!refreshTokens.includes(refreshToken)) return res.sendStatus(403)
//   jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
//     if (err) return res.sendStatus(403)
//     const accessToken = generateAccessToken({ name: user.name })
//     res.json({ accessToken: accessToken })
//   })
// })

// // app.delete('/logout', (req, res) => {
// //   refreshTokens = refreshTokens.filter(token => token !== req.body.token)
// //   res.sendStatus(204)
// // })

// app.listen(4000)