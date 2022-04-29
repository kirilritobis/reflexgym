import { Request, Response, NextFunction } from 'express'

const jwt = require('jsonwebtoken')

export function verifyToken(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if(!token) {
        return res.sendStatus(401)
    }

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err: any) => {
        if(err) {
            return res.sendStatus(403)
        }
        next()
    })
}