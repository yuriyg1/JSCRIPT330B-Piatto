require('dotenv').config()
const jwt = require('jsonwebtoken');
const secretKey = process.env.JWT_SECRET

async function isAuthorized(req, res, next) {
  const authorizationHeader = req.headers.authorization;

  if (!authorizationHeader) {
    return res.status(401).json({ message: 'Authorization header missing or invalid' });
  }

  const [bearR, tokenString] = authorizationHeader.split(' ');

  if (!tokenString) {
    return res.status(401).json({ message: 'Authorization Token missing or invalid' });
  }
  try {
    const decodedToken = jwt.verify(tokenString, secretKey);
    req.JWToken = decodedToken;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'total failure' });
  }
}

module.exports = { isAuthorized };
