import { DataTypes, Model, Sequelize, Optional } from 'sequelize';

interface UniversityAttributes {
  id: number;
  name: string;
  town: string;
}

interface UniversityCreationAttributes extends Optional<UniversityAttributes, 'id'> {}

export class University extends Model<UniversityAttributes, UniversityCreationAttributes> implements UniversityAttributes {
  public id!: number;
  public name!: string;
  public town!: string;
}

export const UniversityModel = (sequelize: Sequelize) => {
  University.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
      },
      town: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: false,
      },
    },
    {
      sequelize,
      tableName: 'universities',
    }
  );

  return University;
};
