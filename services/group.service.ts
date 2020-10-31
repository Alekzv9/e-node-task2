import Group from '../models/group.model';
import { serviceLogger } from '../utils/logger';

exports.createGroup = async (groupData: any) => {
  serviceLogger('createGroup', groupData);
  const { id, name, permissions } = groupData;
  try {
    const newGroup = await Group.create({
      id,
      name,
      permissions: permissions.join(',')
    });
    if (newGroup) {
      return { message: 'Group created', group: newGroup };
    }
  } catch (e) {
    return { message: 'Group creation failed' };
  }
};

exports.updateGroup = async (id: string, groupData: any) => {
  serviceLogger('updateGroup', { id, groupData });
  try {
    const group: any = await getGroup(id);
    if (group) {
      const { name, permissions } = groupData;
      group.name = name;
      group.permissions = permissions.join(',');
      await group.save();
      return { message: 'Group updated', group };
    } else {
      return { message: 'Group not found' };
    }
  } catch (e) {
    return { message: 'Group update failed' };
  }
};

exports.deleteGroup = async (id: string) => {
  serviceLogger('deleteGroup', { id });
  try {
    const group = await getGroup(id);
    if (group) {
      group.destroy();
      return { message: 'Group deleted', group };
    } else {
      return { message: 'Group not found' };
    }
  } catch (e) {
    return { message: 'Group deletion failed' };
  }
};

exports.getGroups = async () => {
  serviceLogger('getGroups');
  const groups = await Group.findAll({
    attributes: ['id', 'name', 'permissions']
  });
  return groups;
};

const getGroup = async (id: string) => {
  serviceLogger('getGroup');
  const group = await Group.findOne({
    where: {
      id
    },
    attributes: ['id', 'name', 'permissions']
  });
  return group;
};

exports.getGroup = getGroup;
