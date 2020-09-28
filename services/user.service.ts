import User from '../models/user.model';

const users: User[] = [
  {
    id: '0',
    age: 54,
    isDeleted: false,
    login: 'Je',
    password: '123',
  },
];

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
    return { user };
  } else {
    return { msg: 'User not found.' };
  }
};

exports.getAutoSuggestUsers = (loginSubstring: string, limit: number) => {
  const regex = new RegExp(`${loginSubstring}`, 'g');
  const filtered = users
    .filter((usr) => usr.login.match(regex))
    .splice(0, limit);
  return filtered;
};

exports.getUsers = () => {
  return users.slice();
};

exports.getUser = (id: number) => getUser(id);

const getUser = (id: number) => {
  const user = users.find((usr) => +usr.id == id);
  return user;
};
