import jwt from 'jsonwebtoken'
import 'dotenv/config'

export const requireAuth = (req, res, next) => {
  const token = req.headers.authorization.split(' ')[1]
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
      if (err) {
        console.log(err.message)
        res.sendStatus(401)
      } else {
        req.decodedToken = decodedToken
        next()
      }
    })
  } else {
    res.sendStatus(401)
  }
}
