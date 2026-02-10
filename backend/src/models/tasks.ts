import {
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  DataTypes,
} from "sequelize";

import SequelizeConfig from "../db.config";
import { Stages } from "./stages";

export class Tasks extends Model<
    InferAttributes<Tasks>,
    InferCreationAttributes<Tasks>
> {
    declare id: CreationOptional<number>;
    declare name: string;
    declare stageId: number;
}
Tasks.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,            
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        stageId: {
            type: DataTypes.INTEGER,
            allowNull: true,   
            references: {
                model: 'stages',
                key: 'id',
            },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
        },
    },
    {
        sequelize: SequelizeConfig,             
        tableName: "tasks",
        timestamps: false,
    }
);

Tasks.belongsTo(Stages, { foreignKey: "stageId", as: "stage" });