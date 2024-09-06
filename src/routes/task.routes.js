import { Router } from "express";
import {createTask, deleteTask, getTaskById, getTasks, updateTask} from "../controllers/task.controller.js"
import { taskValidationRules, validateRequest } from "../middlewares/task.validator.js";

const router = Router();

router.post("/task",taskValidationRules, validateRequest, createTask);
router.get("/task", getTasks);
router.get("/task/:id", getTaskById);
router.put("/task/:id",taskValidationRules, updateTask);
router.delete("/task/:id", deleteTask);

export default router;