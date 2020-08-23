import { sequelize } from '../data-access/database';
import Sequelize from 'sequelize';

const UserGroup = sequelize.define('usergroup', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  userid: {
    type: Sequelize.INTEGER,
    references: { model: 'users', key: 'id' },
  },
  groupid: {
    type: Sequelize.TEXT,
    references: { model: 'groups', key: 'id' },
  },
});

export default UserGroup;
