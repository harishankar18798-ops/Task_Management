"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Stages = void 0;
const sequelize_1 = require("sequelize");
const db_config_1 = __importDefault(require("../db.config"));
class Stages extends sequelize_1.Model {
}
exports.Stages = Stages;
Stages.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
}, {
    sequelize: db_config_1.default,
    tableName: "stages",
    timestamps: false,
});
