import { DataTypes } from "sequelize";

export default function branch(database) {
  const Branch = database.define(
    "Branch",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      location: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      tableName: "branches",
      timestamps: true,
    }
  );

  Branch.associate = (models) => {};

  return Branch;
}
