import { DataTypes, Model, Sequelize, Optional } from 'sequelize';

interface SubjectAttributes {
  id: number;
  name: string;
}

interface SubjectCreationAttributes extends Optional<SubjectAttributes, 'id'> {}

export class Subject extends Model<SubjectAttributes, SubjectCreationAttributes> implements SubjectAttributes {
  public id!: number;
  public name!: string;
}

export const SubjectModel = (sequelize: Sequelize) => {
  Subject.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
    },
    {
      sequelize,
      tableName: 'subjects',
    }
  );

  return Subject;
};