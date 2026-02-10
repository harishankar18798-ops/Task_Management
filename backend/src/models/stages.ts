import {
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  DataTypes,
} from "sequelize";

import SequelizeConfig from "../db.config";

export class Stages extends Model<
  InferAttributes<Stages>,
  InferCreationAttributes<Stages>
> {
  declare id: CreationOptional<number>;
  declare name: string;
}

Stages.init(
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
  },
  {
    sequelize: SequelizeConfig,
    tableName: "stages",
    timestamps: false,
  }
);
