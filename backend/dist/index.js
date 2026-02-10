"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.initializeDatabase = initializeDatabase;
const db_config_1 = require("./db.config");
require("./models/tasks");
require("./models/stages");
const express_1 = __importDefault(require("express"));
const tasksRoutes_1 = __importDefault(require("./routes/tasksRoutes"));
const stagesRoutes_1 = __importDefault(require("./routes/stagesRoutes"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
const PORT = process.env.PORT || 5000;
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use("/api", tasksRoutes_1.default);
app.use("/api", stagesRoutes_1.default);
async function initializeDatabase() {
    try {
        await db_config_1.SequelizeConfig.authenticate();
        console.log("Database connection has been established successfully.");
        await db_config_1.SequelizeConfig.sync({ alter: true });
        console.log("All models were synchronized successfully.");
    }
    catch (error) {
        console.error("Unable to connect to the database:", error);
    }
}
async function startServer() {
    try {
        await initializeDatabase();
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    }
    catch (error) {
        console.error("Failed to start server:", error);
    }
}
startServer();
