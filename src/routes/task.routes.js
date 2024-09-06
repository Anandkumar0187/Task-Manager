import { Router } from "express";
import {createTask, deleteTask, getTaskById, getTasks, updateTask} from "../controllers/task.controller.js"
import { taskValidationRules, validateRequest } from "../middlewares/task.validator.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.post("/task",taskValidationRules, validateRequest, verifyJWT, createTask);
router.get("/task",verifyJWT ,getTasks);
router.get("/task/:id",verifyJWT, getTaskById);
router.put("/task/:id",taskValidationRules,verifyJWT, updateTask);
router.delete("/task/:id",verifyJWT, deleteTask);

export default router;