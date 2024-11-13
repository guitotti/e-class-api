import { openDb } from "../db_config.js";

export async function createStudentTable() {
  openDb().then((db) => {
    db.exec(
      "CREATE TABLE IF NOT EXISTS Student ( id INTEGER PRIMARY KEY, name TEXT, userId TEXT, password TEXT )"
    );
  });
}

export async function insertStudent(req, res) {
  const student = req.body;
  openDb().then((db) => {
    db.run("INSERT INTO Student (name, UserId, password) VALUES (?,?,?)", [
      student.name,
      student.userId,
      student.password,
    ]);
  });
  res.json({
    statusCode: 200,
  });
}

export async function updateStudent(req, res) {
  const student = req.body;
  openDb().then((db) => {
    db.run("UPDATE Student SET name=?, userId=?, password=? WHERE id=?", [
      student.name,
      student.userId,
      student.password,
    ]);
  });
  res.json({
    statusCode: 200,
  });
}

export async function selectStudent(req, res) {
  const id = req.params.id;
  openDb().then(async (db) => {
    db.get("SELECT * FROM Student WHERE id = ?", [id]).then((student) =>
      res.json(student)
    );
  });
}

export async function deleteStudent(req, res) {
  const id = req.params.id;
  openDb().then(async (db) => {
    db.run("DELETE FROM Student WHERE id = ?", [id]).then((res) => res);
  });
  res.json({
    statusCode: 200,
  });
}
