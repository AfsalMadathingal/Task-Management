import { Router } from "express";
import { addTask, deleteTask, getTasks, getTaskStatistics, updateTask } from "../controllers/taskController.js";

const router = Router();



router.post('/task', addTask);
router.get('/statistics', getTaskStatistics);
router.get('/task', getTasks);
router.put('/task/:id', updateTask);
router.delete('/task/:id',deleteTask);






export default router