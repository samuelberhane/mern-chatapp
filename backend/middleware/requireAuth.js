const jwt = require("jsonwebtoken");
const requireAuth = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization)
    return res.status(401).json({ message: "Authorization token required!" });
  const token = authorization.split(" ")[1];
  try {
    jwt.verify(token, process.env.SECRET);
    next();
  } catch (error) {
    res.status(401).json({ message: "Authorization failed!" });
  }
};

module.exports = requireAuth;
