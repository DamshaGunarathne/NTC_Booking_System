const jwt = require("jsonwebtoken");

const auth = (requiredRole) => {
  return (req, res, next) => {
    if (!req.headers || !req.headers.authorization) {
      return res.status(401).json({ message: "Unauthorized, no token provided" });
    }

    let token = req.headers.authorization;

    if (token.startsWith("Bearer")) {
      try {
        token = token.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Attach user data to the request

        // Check role if requiredRole is specified
        if (requiredRole && req.user.role !== requiredRole) {
          return res.status(403).json({ message: "Forbidden, insufficient permissions" });
        }

        next();
      } catch (err) {
        return res.status(401).json({ message: "Unauthorized, invalid token" });
      }
    } else {
      return res.status(401).json({ message: "Unauthorized, invalid token format" });
    }
  };
};

module.exports = auth;
