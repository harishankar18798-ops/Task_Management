import {Request, Response} from "express";
import {TaskService} from "../service/tasksService";

export async function createTask(req: Request, res: Response) {
    try {
        const {name, stageId} = req.body;
        const newTmember = await TaskService.createTask(name, stageId);
        res.status(201).json(newTmember);
    } catch (error) {
        res.status(500).json({error: 'Failed to create Task'});
    }
}

export async function getAllTasks(req: Request, res: Response) {
    try {
        const tasks = await TaskService.getAllTasks();
        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({error: 'Failed to retrieve Tasks'});
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

export async function deleteTask(req: Request, res: Response) {
    try {
        const {id} = req.params;
        const numericId = Number(id);
        await TaskService.deleteTask(numericId);
        res.status(200).json({message: 'Task deleted successfully'});
    } catch (error) {
        res.status(500).json({error: 'Failed to delete Task'});
    }
}

export async function updateTask(req: Request, res: Response) {
    try {
        const {id} = req.params;
        const {name, stageId} = req.body;
        const numericId = Number(id);
        const task = await TaskService.updateTask(numericId, name, stageId);
        res.status(200).json(task);
    } catch (error) {
        res.status(500).json({error: 'Failed to update Task'});
    }
}

