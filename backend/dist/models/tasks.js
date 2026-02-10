"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tasks = void 0;
const sequelize_1 = require("sequelize");
const db_config_1 = __importDefault(require("../db.config"));
const stages_1 = require("./stages");
class Tasks extends sequelize_1.Model {
}
exports.Tasks = Tasks;
Tasks.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    stageId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: 'stages',
            key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
    },
}, {
    sequelize: db_config_1.default,
    tableName: "tasks",
    timestamps: false,
});
Tasks.belongsTo(stages_1.Stages, { foreignKey: "stageId", as: "stage" });
