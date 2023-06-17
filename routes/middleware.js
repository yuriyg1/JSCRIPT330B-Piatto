require('dotenv').config()
const jwt = require('jsonwebtoken');
const secretKey = process.env.JWT_SECRET

async function isAuthorized(req, res, next) {
  const authorizationHeader = req.headers.authorization;
        // console.log('authorizationHeader',authorizationHeader)

  if (!authorizationHeader) {
    return res.status(401).json({ message: 'Authorization header missing or invalid' });
  }

  const [bearR, tokenString] = authorizationHeader.split(' ');
        // console.log('tokenString',tokenString)

  if (!tokenString) {
    return res.status(401).json({ message: 'Authorization Token missing or invalid' });
  }
  try {
    const decodedToken = jwt.verify(tokenString, secretKey);
          // console.log("decodedToken",decodedToken)
    req.JWToken = decodedToken;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'total failure' });
  }
}

module.exports = { isAuthorized };
