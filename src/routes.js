import Router from "express";

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
} from "./controllers/Student.js";

const router = Router();

router.get("/", (req, res) => res.json({ message: "API is running!" }));

createTeacherTable();
createStudentTable();

router.get("/teachers", selectAllTeachers);
router.get("/teacher/:id", selectTeacher);
router.post("/teacher", insertTeacher);
router.put("/teacher", updateTeacher);
router.delete("/teacher/:id", deleteTeacher);

router.get("/student/:id", selectStudent);
router.post("/student", insertStudent);
router.put("/student", updateStudent);
router.delete("/student/:id", deleteStudent);

export default router;
