const express = require('express');
const router = express.Router();
const User = require('../model/user.model');

// Static users
const users = [
  new User(1, 'John', '123', 22, false),
  new User(2, 'Jane', '321', 23, false),
];

/** TODO: REMOVE ME AT THE END */
router.get('/', (req, res, next) => {
  res.json({ users });
});

/**
 * Get user by ID
 */
router.get('/:id', (req, res, next) => {
  const { id } = req.params;
  console.log(id);
  res.json({ ok: true });
});

/**
 * Create user.
 * Type: ../model/User
 */
router.post('', (req, res, next) => {
  const { id, login, password, age } = req.body;
  const user = new User(id, login, password, age, false);
  users.push(user);
  // TODO ADD USER VALIDATION.
  res.json({ user, message: 'User created' });
});

/**
 * Updates an user.
 */
router.put('/:id', (req, res, next) => {
  const { id } = req.params;
  const userIndex = users.findIndex((user) => user.id === +id);
  if (userIndex > 0) {
    const { id, login, password, age } = req.body;
    const user = new User(id, login, password, age, false);
    users[userIndex] = user;
    res.json({ user, message: 'User updated' });
  } else {
    res.status(404).json({ message: 'User not found' });
  }
});

/**
 * Returns list of auto suggested users
 * limit: number of users to retrieve.
 * loginSubstring: query string.
 */
router.post('/auto-suggest', (req, res, next) => {
  const { login, limit } = req.body;
  const query = new RegExp('^' + login, 'i');

  const userList = users.filter((user) => query.test(login)).slice(0, limit);

  res.json({ users: userList });
});

/**
 * Soft delete a User.
 */
router.delete('/:id', (req, res, next) => {
  const { id } = req.params;
  const user = users.find((user) => user.id === +id);
  if (user) {
    user.isDeleted = true;
    return res.json({ message: 'User removed' });
  } else {
    return res.status(404).json({ message: 'User not found' });
  }
});

module.exports = router;
