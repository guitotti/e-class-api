import Router from "express";
import multer from "multer";
import { storage } from "./multerConfig.js";

const upload = multer({ storage });

import {
  createTeacherTable,
  insertTeacher,
  updateTeacher,
  selectAllTeachers,
  selectTeacher,
  deleteTeacher,
} from "./controllers/Teacher.js";

import {
  createStudentTable,
  insertStudent,
  updateStudent,
  selectStudent,
  deleteStudent,
  selectAllStudents,
} from "./controllers/Student.js";

import {
  createTaskTable,
  insertTask,
  // updateTask,
  selectTask,
  deleteTask,
  selectTasksByStudentId,
  selectAllTasks,
} from "./controllers/Task.js";

import { authenticateTeacher } from "./controllers/TeacherAuthentication.js";
import { authenticateStudent } from "./controllers/StudentAuthentication.js";
import { authenticateJWT } from "./middleware/authenticateJWT.js";

const router = Router();

router.get("/", (req, res) => res.json({ message: "API is running! 🚀" }));

createTeacherTable();
createStudentTable();
createTaskTable();

router.get("/teachers", selectAllTeachers);
router.get("/teacher/:id", selectTeacher);
router.post("/teacher", insertTeacher);
router.put("/teacher", updateTeacher);
router.delete("/teacher/:id", deleteTeacher);

router.get("/students", selectAllStudents);
router.get("/student/:id", selectStudent);
router.post("/student", insertStudent);
router.put("/student", updateStudent);
router.delete("/student/:id", deleteStudent);

router.get("/tasks", selectTasksByStudentId);
// router.get("/tasks", selectAllTasks);
router.get("/task/:id", selectTask);
router.post("/task", insertTask);
// router.put("/task", updateTask);
router.delete("/task/:id", deleteTask);

router.post("/login", authenticateTeacher);
router.post("/student/login", authenticateStudent);

export default router;
