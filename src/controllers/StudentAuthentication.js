import { openDb } from "../db_config.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const SECRET_KEY = process.env.JWT_SECRET;

export async function authenticateStudent(req, res) {
  const { userId, password } = req.body;

  try {
    const db = await openDb();
    const row = await db.get(
      "SELECT * FROM students WHERE userId = ? AND password = ?",
      [userId, password]
    );

    if (row) {
      const token = jwt.sign({ userId }, SECRET_KEY, { expiresIn: "1h" });
      res.json({ token, studentId: row });
    } else {
      res.status(401).json({ message: "Invalid credentials!" });
    }
  } catch (err) {
    res.status(500).json({ message: "Error querying the database." });
  }
}
