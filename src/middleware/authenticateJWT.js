import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const SECRET_KEY = process.env.JWT_SECRET;

export function authenticateJWT(req, res, next) {
  const bearerHeader = req.headers["authorization"];

  if (typeof bearerHeader !== "undefined") {
    const bearer = bearerHeader.split(" ");
    const bearerToken = bearer[1];
    req.token = bearerToken;

    jwt.verify(req.token, SECRET_KEY, (err, decoded) => {
      if (err) {
        res.status(401).json({ message: "Invalid token" });
      } else {
        next();
      }
    });
  } else {
    res.status(401).json({ message: "Token not found" });
  }
}
