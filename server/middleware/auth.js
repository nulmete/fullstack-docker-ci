const { verify } = require("jsonwebtoken");

module.exports = (req, _res, next) => {
  // Get the Authorization header from the user's request
  const authHeader = req.get("Authorization");

  // If there's no Authorization header...
  if (!authHeader) {
    const error = new Error("No está autenticado");
    error.statusCode = 401;
    throw error;
  }

  try {
    const token = authHeader.split(" ")[1];
    const decodedToken = verify(token, process.env.ACCESS_TOKEN_SECRET);
    req.userId = decodedToken.userId;
  } catch (error) {
    error.statusCode = 401;
    error.message = "Access token expirado";
    throw error;
  }

  next();
};
