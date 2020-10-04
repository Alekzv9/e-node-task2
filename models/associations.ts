import User from './user.model';
import Group from './group.model';

Group.belongsToMany(User, {
  through: 'usergroup',
  foreignKey: 'group_id'
});

User.belongsToMany(Group, {
  through: 'usergroup',
  foreignKey: 'user_id'
});
