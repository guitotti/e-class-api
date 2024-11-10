import Router from 'express';

import {
  createTable,
  insertTeacher,
  updateTeacher,
  selectAllTeachers,
  selectTeacher,
  deleteTeacher,
} from "./controllers/Teacher.js";

const router = Router();

router.get("/", (req, res) => res.json({ message: "API is running!" }));

router.get("/teachers", selectAllTeachers);
router.get("/teacher/:id", selectTeacher);
router.post("/teacher", insertTeacher);
router.put("/teacher", updateTeacher);
router.delete("/teacher/:id", deleteTeacher);

export default router;