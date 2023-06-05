const jwt = require('jsonwebtoken');

// const secretKey = process.env.JWT_SECRET;
const secretKey = 'abc123';

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
          console.log("decodedToken",decodedToken)
    req.JWToken = decodedToken;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'total failure' });
  }
}

async function isAdmin(req, res, next) {
  const { roles } = req.JWToken;

  if (!roles || !roles.includes('admin')) {
    return res.status(403).json({ message: 'Unauthorized: User is not an admin' });
  }

  next();
}

module.exports = { isAuthorized, isAdmin };
