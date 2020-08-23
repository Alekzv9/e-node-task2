import express from 'express';
const Joi = require('@hapi/joi');

const router = express.Router();
const UserService = require('../services/user.service');
const UserGroupService = require('../services/user-group.service');
const validator = require('express-joi-validation').createValidator({});

const userSchema = Joi.object({
  login: Joi.string().required(),
  password: Joi.string().required(),
  age: Joi.number().required(),
});

/**
 * Get user by ID
 */
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const user = await UserService.getUser(+id);
  res.json({ user });
});

/**
 * Create user.
 * Type: ../model/User
 */
router.post('', validator.body(userSchema), async (req, res, next) => {
  const response = await UserService.createUser(req.body);
  let status = 200;
  if (!response.user) {
    status = 400;
  }
  res.status(status).json(response);
});

/**
 * Updates an user.
 */
router.put('/:id', validator.body(userSchema), async (req, res) => {
  const { id } = req.params;
  const response = await UserService.updateUser(id, req.body);
  let status = 200;
  if (!response.user) {
    status = 400;
  }
  res.status(status).json(response);
});

/**
 * Returns list of auto suggested users
 * limit: number of users to retrieve.
 * loginSubstring: query string.
 */
router.post('/auto-suggest', async (req, res, next) => {
  const response = await UserService.getSuggestedUsers(req.body);
  res.json({ users: response });
});

/**
 * Soft delete a User.
 */
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const response = await UserService.deleteUser(id);
  let status = 200;
  if (!response.user) {
    status = 400;
  }
  res.status(status).json(response);
});

router.post('/addUsersToGroup', async (req, res) => {
  const response = await UserGroupService.createUserGroup(req.body);
  let status = 200;
  if (!response.group) {
    status = 400;
  }
  res.status(status).json(response);
});

module.exports = router;
