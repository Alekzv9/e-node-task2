const express = require('express');
const Joi = require('@hapi/joi');

const router = express.Router();
const User = require('../model/user.model');
const validator = require('express-joi-validation').createValidator({});

const userSchema = Joi.object({
  id: Joi.number().required(),
  login: Joi.string().required(),
  password: Joi.string().required(),
  age: Joi.number().required(),
});

// Static users
const users = [
  new User(1, 'John', '123', 22, false),
  new User(2, 'Jane', '321', 23, false),
];

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
router.post('', validator.body(userSchema), (req, res, next) => {
  const { id, login, password, age } = req.body;
  const userFound = users.find((user) => user.id === +id);
  if (userFound) {
    res.status(400).json({ message: 'User with same id already exists' });
  }
  const user = new User(id, login, password, age, false);
  users.push(user);
  res.json({ user, message: 'User created' });
});

/**
 * Updates an user.
 */
router.put('/:id', validator.body(userSchema), (req, res, next) => {
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
