import express from "express";
import {
  completeTask,
  createTask,
  deleteTask,
} from "../controllers/taskController.js";

const router = express.Router();

router.post("/", createTask);
router.patch("/:id/complete", completeTask);
router.delete("/:id", deleteTask);

export default router;
