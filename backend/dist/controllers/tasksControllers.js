"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTask = createTask;
exports.getAllTasks = getAllTasks;
exports.deleteTask = deleteTask;
exports.updateTask = updateTask;
const tasksService_1 = require("../service/tasksService");
async function createTask(req, res) {
    try {
        const { name, stageId } = req.body;
        const newTmember = await tasksService_1.TaskService.createTask(name, stageId);
        res.status(201).json(newTmember);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to create Task' });
    }
}
async function getAllTasks(req, res) {
    try {
        const tasks = await tasksService_1.TaskService.getAllTasks();
        res.status(200).json(tasks);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to retrieve Tasks' });
    }
}
// export async function getTmembersbyId(req: Request, res: Response) {
//     try {
//         const {id} = req.params;
//         const tmembers = await TmemberService.getTmembersbyId(Number(id));
//         res.status(200).json(tmembers);
//     } catch (error) {
//         res.status(500).json({error: 'Failed to retrieve TMembers by ID'});
//     }
// }
async function deleteTask(req, res) {
    try {
        const { id } = req.params;
        const numericId = Number(id);
        await tasksService_1.TaskService.deleteTask(numericId);
        res.status(200).json({ message: 'Task deleted successfully' });
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to delete Task' });
    }
}
async function updateTask(req, res) {
    try {
        const { id } = req.params;
        const { name, stageId } = req.body;
        const numericId = Number(id);
        const task = await tasksService_1.TaskService.updateTask(numericId, name, stageId);
        res.status(200).json(task);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to update Task' });
    }
}
