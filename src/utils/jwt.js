const jwt = require('jsonwebtoken')

const secretKey = 'secreto'

const generateToken = user => {
  return jwt.sign({ user }, secretKey, { expiresIn: '30000' })
}

const authToken = (req, res, next) => {
  const authHeader = req.headers.authorization

  if (!authHeader)
    return res.status(401).json({ status: 'error', error: 'Unauthorized' })

  const token = authHeader

  jwt.verify(token, secretKey, (error, credentials) => {
    if (error)
      return res.status(403).json({ status: 'error', error: 'Forbidden' })

    req.user = credentials.user
    next()
  })
}

module.exports = {
  generateToken,
  authToken,
}
