import { DataTypes } from "sequelize";
import { sequelize } from "./index.js";

export const User = sequelize.define(
  "user",
  {
    id: {
      type: DataTypes.CHAR(36),
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    name: { type: DataTypes.STRING(50), allowNull: false },
    email: { type: DataTypes.STRING(100), allowNull: false, unique: true },
    password: { type: DataTypes.STRING(255), allowNull: false },
    role: { type: DataTypes.ENUM("ADMIN", "USER"), allowNull: false },
  },
  {
    tableName: "user",
    timestamps: true,
    underscored: true, // formatea a created_at | updated_at
  }
);
