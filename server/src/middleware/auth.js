const jwt = require('jsonwebtoken');

module.exports = async (req, res, next) => {
  const { token } = req.cookies;
  if (token) {
    try {
      const { userId } = jwt.verify(token, process.env.JWT_SECRET);
      req.userId = userId || null;
    } catch (ex) {
      req.userId = null;
    }

  }
  next();
}
