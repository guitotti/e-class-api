import { openDb } from "../db_config.js";
import { v4 as uuidv4 } from "uuid";

export async function createTaskTable() {
  try {
    await openDb().then((db) => {
      db.exec(
        "CREATE TABLE IF NOT EXISTS tasks ( id TEXT PRIMARY KEY, title TEXT NOT NULL, description TEXT NOT NULL, status TEXT NOT NULL, dueDate TEXT NOT NULL, filePath TEXT NULL, teacherId INTEGER NOT NULL, studentId INTEGER NOT NULL, FOREIGN KEY (teacherId) REFERENCES teachers(id), FOREIGN KEY (studentId) REFERENCES students(id) )"
      );
    });
  } catch (error) {
    console.log(error);
  }
}

export async function insertTask(req, res) {
  const task = JSON.parse(req.body.data);
  const taskId = uuidv4();
  const file = req.file;
  let fileName;

  if (!file) {
    fileName = null;
  } else {
    fileName = file.filename;
  }

  const query = `
    INSERT INTO tasks (id, title, description, status, dueDate, filePath, teacherId, studentId)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `;

  openDb().then((db) => {
    db.run(query, [
      taskId,
      task.title,
      task.description,
      task.status,
      task.dueDate,
      fileName,
      task.teacherId,
      task.studentId,
    ]);
  });
  res.json({ message: "Task created successfully!" });
}

export async function selectTask(req, res) {
  const id = req.params.id;
  openDb().then((db) => {
    db.get("SELECT * FROM tasks WHERE id = ?", [id]).then((task) =>
      res.json(task)
    );
  });
}

export async function selectTasksByStudentAndTeacherAndStatus(req, res) {
  const studentId = req.body.studentId;
  const teacherId = req.body.teacherId;
  const status = req.body.status; // pendente, completa, corrigida

  openDb().then((db) => {
    db.all(
      `
      SELECT * FROM tasks
      WHERE studentId = ? AND teacherId = ? AND status = ?
    `,
      [studentId, teacherId, status]
    ).then((tasks) => res.json(tasks));
  });
}

export async function deleteTask(req, res) {
  const id = req.params.id;
  openDb().then((db) => {
    db.run("DELETE FROM tasks WHERE id = ?", [id]).then((res) => res);
  });
  res.json({ message: "Task deleted successfully!" });
}
