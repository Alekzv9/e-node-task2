import User from '../models/user.model';

const users: User[] = [];

exports.createUser = (userData: User) => {
  const user = users.find((usr) => usr.login === userData.login);
  if (user) {
    return { msg: 'User duplicated.' };
  }
  userData.isDeleted = false;
  userData.id = users.length.toString();
  users.push(userData);
  return { user: userData };
};

exports.updateUser = (id: number, userData: User) => {
  const user = getUser(id);
  if (user) {
    user.age = userData.age;
    user.password = userData.password;
    const index = users.findIndex((usr) => +usr.id === id);
    users[index] = user;
    return { user };
  } else {
    return { msg: 'User not found.' };
  }
};

exports.deleteUser = (id: number) => {
  const user = getUser(id);
  if (user) {
    user.isDeleted = true;
    return { users };
  } else {
    return { msg: 'User not found.' };
  }
};

exports.getAutoSuggestUsers = (loginSubstring: string, limit: number) => {};

exports.getUsers = () => {
  return users.slice();
};

const getUser = (id: number) => {
  const user = users.find((usr) => +usr.id === id);
  return user;
};

exports.getUser = (id: number) => {
  return { user: getUser(id) };
};
