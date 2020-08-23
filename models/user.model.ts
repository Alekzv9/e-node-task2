import Sequelize from 'sequelize';
import { sequelize } from '../data-access/database';

const User = sequelize.define('user', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  login: {
    type: Sequelize.TEXT,
  },
  password: {
    type: Sequelize.TEXT,
  },
  age: {
    type: Sequelize.INTEGER,
  },
  isdeleted: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
});

User.associate = (models: any) => {
  User.belongsToMany(models.group, {
    through: 'usergroup',
    foreignKey: 'user_id',
  });
};

export default User;
