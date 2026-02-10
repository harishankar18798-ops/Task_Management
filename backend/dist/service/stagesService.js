"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StageService = void 0;
const stages_1 = require("../models/stages");
class StageService {
    static async getAllStages() {
        return await stages_1.Stages.findAll();
    }
}
exports.StageService = StageService;
