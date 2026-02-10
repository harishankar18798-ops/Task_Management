"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskService = void 0;
const tasks_1 = require("../models/tasks");
const stages_1 = require("../models/stages");
class TaskService {
    static async createTask(name, stageId) {
        const task = await tasks_1.Tasks.create({ name, stageId });
        return await task.reload({
            include: [
                {
                    model: stages_1.Stages,
                    as: "stage",
                    attributes: ["id", "name"],
                },
            ],
        });
    }
    // static async getAllTasks() {
    //     return await Tasks.findAll();
    // }
    static async getAllTasks() {
        return await tasks_1.Tasks.findAll({
            include: [{ model: stages_1.Stages, as: 'stage', attributes: ['id', 'name'] }],
        });
    }
    //     static async getTmembersbyId(teamId: number) {
    //         return await TMember.findAll({where: {teamId}});
    //     }
    static async deleteTask(id) {
        return await tasks_1.Tasks.destroy({ where: { id } });
    }
    static async updateTask(id, name, stageId) {
        const task = await tasks_1.Tasks.findByPk(id);
        if (!task) {
            throw new Error("Task not found");
        }
        task.name = name;
        task.stageId = stageId;
        await task.save();
        return await task.reload({
            include: [
                {
                    model: stages_1.Stages,
                    as: "stage",
                    attributes: ["id", "name"],
                },
            ],
        });
    }
}
exports.TaskService = TaskService;
