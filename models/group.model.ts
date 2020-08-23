import Sequelize from 'sequelize';
import { sequelize } from '../data-access/database';

const Group = sequelize.define('group', {
  id: {
    type: Sequelize.TEXT,
    primaryKey: true,
  },
  name: {
    type: Sequelize.TEXT,
  },
  permissions: {
    type: Sequelize.TEXT,
  },
});

export default Group;
