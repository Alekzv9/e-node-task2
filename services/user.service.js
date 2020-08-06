import User from '../models/user.model';
import Sequelize from 'sequelize';
const Op = Sequelize.Op;

exports.createUser = async (userData) => {
  const { login, password, age } = userData;
  try {
    const newUser = await User.create({
      login,
      password,
      age,
    });
    if (newUser) {
      return { message: 'User created', user: newUser };
    }
  } catch (e) {
    console.log(e);
    return { message: 'User creation failed' };
  }
};

exports.updateUser = async (id, userData) => {
  try {
    const user = await getUser(id);
    if (user) {
      const { login, password, age } = userData;
      user.login = login;
      user.password = password;
      user.age = age;
      await user.save();
      return { message: 'User updated', user };
    } else {
      return { message: 'User not found' };
    }
  } catch (e) {
    console.log(e);
    return { message: 'User update failed' };
  }
};

exports.deleteUser = async (id) => {
  try {
    const user = await getUser(id);
    if (user) {
      user.isdeleted = true;
      await user.save();
      return { message: 'User deleted', user };
    } else {
      return { message: 'User not found' };
    }
  } catch (e) {
    console.log(e);
    return { message: 'User delete failed' };
  }
};

exports.getSuggestedUsers = async (filterData) => {
  const { login: filter, limit } = filterData;
  const users = await User.findAll({
    where: {
      login: {
        [Op.like]: filter + '%',
      },
    },
    limit,
  });
  return users;
};

const getUser = async (id) => {
  const user = await User.findOne({
    where: {
      id,
    },
    attributes: ['id', 'login', 'age'],
  });
  return user;
};

exports.getUser = getUser;
