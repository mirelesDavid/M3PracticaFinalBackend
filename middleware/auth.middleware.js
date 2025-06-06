const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  const token = req.headers['x-access-token'] || req.headers['authorization'];

  if (!token) {
    return res.status(403).send({
      message: 'No token provided!',
    });
  }

  try {
    const decoded = jwt.verify(token.replace('Bearer ', ''), process.env.JWT_SECRET);
    req.userId = decoded.id;
    next();
  } catch {
    return res.status(401).send({
      message: 'Unauthorized!',
    });
  }
};

module.exports = verifyToken;
