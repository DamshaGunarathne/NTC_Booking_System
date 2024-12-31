// operatorMiddleware.js
module.exports = (req, res, next) => {
    if (req.user.role !== 'Operator') {
      return res.status(403).json({ message: 'Access denied. Not an operator.' });
    }
    next();
  };
  