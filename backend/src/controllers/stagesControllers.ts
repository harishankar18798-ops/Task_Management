import {Request, Response} from "express";
import { StageService } from "../service/stagesService";

export async function getAllStages(req: Request, res: Response) {
    try {
        const stages = await StageService.getAllStages();
        res.status(200).json(stages);
    } catch (error) {
        res.status(500).json({error: 'Failed to retrieve Stages'});
    }
}

