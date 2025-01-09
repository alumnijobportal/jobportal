import jwt from "jsonwebtoken";
import { errorHandler } from "../../utils/errorHandler";

const authenticateJWT = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res
      .status(401)
      .send(errorHandler(401, "Unauthorized", "No token provided"));
  }

  jwt.verify(token, process.env.JWT_SECRET || "jwt_secret", (err, decoded) => {
    if (err) {
      return res
        .status(403)
        .send(errorHandler(403, "Forbidden", "Failed to authenticate token"));
    }

    req.user = decoded;
    next();
  });
};

module.exports = authenticateJWT;
