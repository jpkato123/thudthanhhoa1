import express from "express";
import {
  createCourse,
  deleteCourse,
  getCourses,
  updateCourse,
  registerCourse,
} from "../controllers/course.controller.js";
import { verifyToken } from "../utils/verifyUser.js";

const router = express.Router();

router.get("/getCourses", getCourses);
router.post("/create",verifyToken, createCourse);
router.post("/register/:courseId",verifyToken, registerCourse);
router.put("/update/:courseId",verifyToken ,updateCourse);
router.delete("/delete/:courseId", verifyToken, deleteCourse);

export default router;
