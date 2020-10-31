import User from '../models/user.model';
import Sequelize from 'sequelize';
import { serviceLogger } from '../utils/logger';
import CustomError from '../utils/CustomError';

const Op = Sequelize.Op;

exports.createUser = async (userData: any) => {
  serviceLogger('createUser', userData);
  const { login, password, age } = userData;

  const user = await User.findOne({
    where: {
      login
    },
    attributes: ['id', 'login', 'age']
  });

  if (user) {
    throw new CustomError('User login duplicated');
  } else {
    const newUser = await User.create({
      login,
      password,
      age
    });
    return { message: 'User created', user: newUser };
  }
};

exports.updateUser = async (id: number, userData: any) => {
  serviceLogger('updateUser', { id, userData });
  const user: any = await getUser(id);
  if (!user.message) {
    const { password, age } = userData;
    user.password = password;
    user.age = age;
    await user.save();
    return { message: 'User updated', user };
  } else {
    throw new CustomError('User not found');
  }
};

exports.deleteUser = async (id: number) => {
  serviceLogger('deleteUser', { id });

  const user: any = await getUser(id);
  if (user) {
    user.isdeleted = true;
    await user.save();
    return { message: 'User deleted', user };
  } else {
    throw new CustomError('User not found');
  }
};

exports.getSuggestedUsers = async (filterData: any) => {
  serviceLogger('getSuggestedUsers', { filterData });
  const { loginSubstring: filter, limit } = filterData;
  const users = await User.findAll({
    where: {
      login: {
        [Op.like]: filter + '%'
      }
    },
    limit
  });
  return users;
};

exports.getUsers = async () => {
  serviceLogger('getUsers');
  const users = await User.findAll();
  return users;
};

const getUser = async (id: number) => {
  serviceLogger('getUser', { id });
  const user = await User.findOne({
    where: {
      id
    },
    attributes: ['id', 'login', 'age']
  });

  if (user) {
    return user;
  } else {
    throw new CustomError('User not found.');
  }
};

exports.getUser = getUser;
