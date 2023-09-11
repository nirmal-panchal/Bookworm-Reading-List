const jwt = require("jsonwebtoken");

const validateToken = async (req, res, next) => {
  let token;
  let authHeader = req.headers.authorization || req.headers.Authorization;
  if (authHeader && authHeader.startsWith("Bearer" || "bearer")) {
    token = authHeader.split(" ")[1];
    if (token === "undefined" || !token) {
      return res.status(401).json({ message: "User is not authorized.." });
    } else {
      jwt.verify(token, process.env.JWT_SECRET, (err, decode) => {
        if (err) {
          res.status(401).json({ message: "User is not authorized.." });
        } 
        req.user = decode.user;
        next();
      });
    }
  }
};

module.exports = validateToken;
