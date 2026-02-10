import { Tasks } from "../models/tasks";
import { Stages } from "../models/stages";

export class TaskService {
    
    static async createTask(name: string, stageId: number) {
        const task = await Tasks.create({ name, stageId });

        return await task.reload({
            include: [
            {
                model: Stages,
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
        return await Tasks.findAll({
        include: [{ model: Stages, as: 'stage', attributes: ['id', 'name'] }],
    });
   }
   

//     static async getTmembersbyId(teamId: number) {
//         return await TMember.findAll({where: {teamId}});
//     }

    static async deleteTask(id: number) {
        return await Tasks.destroy({where: {id}});
    }

        
    static async updateTask(id: number, name: string, stageId: number) {
            const task = await Tasks.findByPk(id);

            if (!task) {
                throw new Error("Task not found");
            }

            task.name = name;
            task.stageId = stageId;
            await task.save();
            
            return await task.reload({
            include: [
            {
                model: Stages,
                as: "stage",
                attributes: ["id", "name"],
            },
            ],
        });
        }
    }
