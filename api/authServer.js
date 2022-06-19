require('dotenv').config()

const express = require('express')
const app = express()
const jwt = require('jsonwebtoken')
const bodyParser = require("body-parser");

app.use(express.json())

let refreshTokens = ['eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImtpdG9kb3JvdjEzQGdtYWlsLmNvbSIsImlhdCI6MTY1NTIxMzEwMywiZXhwIjoxNjU1ODE3OTAzfQ.V40n0qzpIISNNL7c9WkcWpObl5QcNPhfjXDSJNrWfdA']

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/token', (req, res) => {
  const refreshToken = req.body.token
  if (refreshToken == null) return res.sendStatus(401)
  // if (!refreshTokens.includes(refreshToken)) return res.sendStatus(403)
  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403)
    const accessToken = generateAccessToken({ name: user.name })
    res.json({ accessToken: accessToken })
  })
})

function generateAccessToken(user){
  try {
      return jwt.sign( { email: user.email }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '10m'})
  } catch (err) {
      logger.error('%o', err)
      // return errorhandler.sendError(err, req, res)
      return err
  }
}

// app.delete('/logout', (req, res) => {
//   refreshTokens = refreshTokens.filter(token => token !== req.body.token)
//   res.sendStatus(204)
// })

app.listen(4000)