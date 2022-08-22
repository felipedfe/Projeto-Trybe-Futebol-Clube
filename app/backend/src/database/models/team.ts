import { Model, STRING, INTEGER } from 'sequelize';
import db from '.';

class Team extends Model {
  id!: number;
  teamName!: string;
}

Team.init({
  id: {
    type: INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  teamName: {
    type: STRING,
  },
}, {
  sequelize: db,
  modelName: 'team',
  underscored: true,
  timestamps: false,
});

export default Team;
