import { openDb } from "../db_config.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const SECRET_KEY = process.env.JWT_SECRET;

export async function authenticateTeacher(req, res) {
  const { email, password } = req.body;

  try {
    const db = await openDb();
    const row = await db.get(
      "SELECT * FROM teachers WHERE email = ? AND password = ?",
      [email, password]
    );

    if (row) {
      const token = jwt.sign({ email }, SECRET_KEY, { expiresIn: "1h" });
      res.json({ token });
    } else {
      res.status(401).json({ message: "Invalid credentials!" });
    }
  } catch (err) {
    res.status(500).json({ message: "Error querying the database." });
  }
}
