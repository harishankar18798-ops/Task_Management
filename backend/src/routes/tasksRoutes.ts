import {Router} from 'express';
import { getAllTasks, createTask, deleteTask, updateTask } from '../controllers/tasksControllers';

const router = Router();

router.post('/createtask', createTask);
router.get('/gettasks', getAllTasks);
router.delete('/deletetask/:id', deleteTask);
router.put('/updatetask/:id', updateTask);

export default router;