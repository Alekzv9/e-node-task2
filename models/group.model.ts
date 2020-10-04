import Sequelize from 'sequelize';
import { sequelize } from '../data-access/datababase';

const Group = sequelize.define('group', {
  id: {
    type: Sequelize.TEXT,
    primaryKey: true
  },
  name: {
    type: Sequelize.TEXT
  },
  permissions: {
    type: Sequelize.TEXT,
    get() {
      // @ts-ignore
      const permissionArray: string[] = this.getDataValue('permissions').split(
        ','
      );
      return permissionArray;
    }
  }
});

// Group.associate = (models: any) => {
//   Group.belongsToMany(models.user, {
//     through: 'usergroup',
//     foreignKey: 'group_id',
//   });
// };

export default Group;
