"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SequelizeConfig = void 0;
const sequelize_1 = require("sequelize");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.SequelizeConfig = new sequelize_1.Sequelize(process.env.DB_NAME || "task_db", process.env.DB_USER || "postgres", process.env.DB_PASSWORD || "root", {
    host: process.env.DB_HOST || "localhost",
    port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 5432,
    dialect: "postgres",
    logging: false,
    pool: {
        max: 20,
        min: 0,
        acquire: 60000,
        idle: 10000,
    },
    define: {
        underscored: true,
        timestamps: true,
    },
});
exports.default = exports.SequelizeConfig;
