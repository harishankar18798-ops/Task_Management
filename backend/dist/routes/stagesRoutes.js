"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const stagesControllers_1 = require("../controllers/stagesControllers");
const router = (0, express_1.Router)();
router.get('/getstages', stagesControllers_1.getAllStages);
exports.default = router;
