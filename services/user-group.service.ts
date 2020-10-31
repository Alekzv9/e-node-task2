import UserGroup from '../models/usergroup.model';
import { serviceLogger } from '../utils/logger';

exports.createUserGroup = async (data: any) => {
  serviceLogger('createUserGroup', data);
  const { userIds, groupId } = data;
  try {
    // @ts-ignore
    const bulk = [];

    userIds.forEach((id: number) => {
      bulk.push({
        userid: id,
        groupid: groupId
      });
    });
    // @ts-ignore
    await UserGroup.bulkCreate(bulk);

    const group = await UserGroup.findAll({
      attributes: ['userid', 'groupid']
    });

    return { message: 'Results', group };
  } catch (e) {
    return { message: 'Something went wrong' };
  }
};
