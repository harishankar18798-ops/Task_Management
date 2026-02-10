import { Stages } from "../models/stages";

export class StageService {
    

    static async getAllStages() {
        return await Stages.findAll();
    }
   
}
