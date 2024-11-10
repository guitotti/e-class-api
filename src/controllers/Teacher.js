import { openDb } from "../db_config.js";

export async function createTable() {
  openDb().then((db) => {
    db.exec(
      "CREATE TABLE IF NOT EXISTS Teacher ( id INTEGER PRIMARY KEY, name TEXT, email TEXT, password TEXT )"
    );
  });
}

export async function insertTeacher(req, res) {
  const teacher = req.body;
  openDb().then((db) => {
    db.run("INSERT INTO Teacher (name, email, password) VALUES (?,?,?)", [
      teacher.name,
      teacher.email,
      teacher.password,
    ]);
  });
  res.json({
    statusCode: 200,
  });
}

export async function updateTeacher(req, res) {
  const teacher = req.body;
  openDb().then((db) => {
    db.run("UPDATE Teacher SET name=?, email=?, password=? WHERE id=?", [
      teacher.name,
      teacher.email,
      teacher.password,
    ]);
  });
  res.json({
    statusCode: 200,
  });
}

export async function selectAllTeachers(req, res) {
  openDb().then((db) => {
    db.all("SELECT * FROM Teacher").then((teachers) => res.json(teachers));
  });
}

export async function selectTeacher(req, res) {
  const id = req.params.id;
  openDb().then(async (db) => {
    db.get("SELECT * FROM Teacher WHERE id = ?", [id]).then((teacher) =>
      res.json(teacher)
    );
  });
}

export async function deleteTeacher(req, res) {
  const id = req.params.id;
  openDb().then(async (db) => {
    db.run("DELETE FROM Teacher WHERE id = ?", [id]).then((res) => res);
  });
  res.json({
    statusCode: 200,
  });
}
