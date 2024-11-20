import { DataTypes, Model, Sequelize, Optional, HasOneSetAssociationMixin, HasOneGetAssociationMixin, BelongsToManyAddAssociationMixin,
  BelongsToManySetAssociationsMixin,
  BelongsToManyGetAssociationsMixin } from 'sequelize';
import { University } from '../university/university';
import { Subject } from '../subjects/subject';

interface UserAttributes {
  id: number;
  name: string;
  universityId: number;
  email: string;
}

interface UserCreationAttributes extends Optional<UserAttributes, 'id'> {}

export class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
  public id!: number;
  public name!: string;
  public universityId!: number;
  public email!: string;
  declare setUniversity: HasOneSetAssociationMixin<University, number>;
  declare getUniversity: HasOneGetAssociationMixin<University>;

  declare addSubject: BelongsToManyAddAssociationMixin<Subject, number>;
  declare setSubjects: BelongsToManySetAssociationsMixin<Subject, number>;

}

export const UserModel = (sequelize: Sequelize) => {
  User.init(
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
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      universityId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: 'users',
    }
  );

  return User;
};