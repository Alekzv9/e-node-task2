import User from '../models/user.model';
import Sequelize from 'sequelize';
const Op = Sequelize.Op;

exports.createUser = async (userData: any) => {
  const { login, password, age } = userData;
  try {
    const user = await User.findOne({
      where: {
        login
      },
      attributes: ['id', 'login', 'age']
    });
    console.log(user);
    if (user) {
      return { message: 'User login duplicated' };
    } else {
      const newUser = await User.create({
        login,
        password,
        age
      });
      return { message: 'User created', user: newUser };
    }
  } catch (e) {
    return { message: 'User creation failed' };
  }
};

exports.updateUser = async (id: number, userData: any) => {
  try {
    const user: any = await getUser(id);
    if (!user.message) {
      const { password, age } = userData;
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

exports.deleteUser = async (id: number) => {
  try {
    const user: any = await getUser(id);
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

exports.getSuggestedUsers = async (filterData: any) => {
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
  const users = await User.findAll();
  return users;
};

const getUser = async (id: number) => {
  const user = await User.findOne({
    where: {
      id
    },
    attributes: ['id', 'login', 'age']
  });

  if (user) {
    return user;
  } else {
    return { user, message: 'User not found.' };
  }
};

exports.getUser = getUser;
