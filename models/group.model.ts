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
    get() {
      // @ts-ignore
      const permissionArray: string[] = this.getDataValue('permissions').split(
        ','
      );
      return permissionArray;
    },
  },
});

export default Group;
