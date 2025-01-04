import jwt from "jsonwebtoken";
const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret_key";

export const authenticateJWT = (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    return res.status(401).send({
      error: "Unauthorized",
      message: "Access denied, token not provided",
    });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).send({
        error: "Forbidden",
        message: "Invalid or expired token",
      });
    }

    req.user = user;
    next();
  });
};
