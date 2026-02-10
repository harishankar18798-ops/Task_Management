"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllStages = getAllStages;
const stagesService_1 = require("../service/stagesService");
async function getAllStages(req, res) {
    try {
        const stages = await stagesService_1.StageService.getAllStages();
        res.status(200).json(stages);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to retrieve Stages' });
    }
}
