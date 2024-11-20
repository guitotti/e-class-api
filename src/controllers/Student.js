import { openDb } from "../db_config.js";

export async function createStudentTable() {
  openDb().then((db) => {
    db.exec(
      "CREATE TABLE IF NOT EXISTS students ( id INTEGER PRIMARY KEY, name TEXT NOT NULL, userId TEXT NOT NULL, email TEXT NULL, password TEXT NOT NULL, description TEXT NOT NULL, weekday TEXT NOT NULL, time TIME NOT NULL)"
    );
  });
}

export async function insertStudent(req, res) {
  const student = req.body;
  openDb().then((db) => {
    db.run(
      "INSERT INTO students (name, userId, email, password, description, weekday, time) VALUES (?,?,?,?,?,?,?)",
      [
        student.name,
        student.userId,
        student.email,
        student.password,
        student.description,
        student.weekday,
        student.time,
      ]
    );
  });
  res.json({
    statusCode: 200,
  });
}

export async function updateStudent(req, res) {
  const student = req.body;
  openDb().then((db) => {
    db.run(
      "UPDATE students SET name=?, userId=?, email=?, password=?, description=?, weekday=?, time=? WHERE id=?",
      [
        student.name,
        student.userId,
        student.email,
        student.password,
        student.description,
        student.weekday,
        student.time,
      ]
    );
  });
  res.json({
    statusCode: 200,
  });
}

export async function selectAllStudents(req, res) {
  openDb().then((db) => {
    db.all("SELECT * FROM students").then((students) => res.json(students));
  });
}

export async function selectStudent(req, res) {
  const id = req.params.id;
  openDb().then(async (db) => {
    db.get("SELECT * FROM students WHERE id = ?", [id]).then((student) =>
      res.json(student)
    );
  });
}

export async function deleteStudent(req, res) {
  const id = req.params.id;
  openDb().then(async (db) => {
    db.run("DELETE FROM students WHERE id = ?", [id]).then((res) => res);
  });
  res.json({
    statusCode: 200,
  });
}
