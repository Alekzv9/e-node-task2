import express from 'express';
import { controllerLogger } from '../utils/logger';
const Joi = require('@hapi/joi');

const userRoutes = express.Router();
const UserService = require('../services/user.service');
const UserGroupService = require('../services/user-group.service');
const validator = require('express-joi-validation').createValidator({});

const userSchema = Joi.object({
  login: Joi.string().required(),
  password: Joi.string().required(),
  age: Joi.number().required()
});

/**
 * Get user by ID
 */
userRoutes.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await UserService.getUser(+id);
    return res.json({ user });
  } catch (err) {
    controllerLogger(req.originalUrl, { params: req.params });
    next(err);
  }
});

/**
 * Create user.
 * Type: ../model/User
 */
userRoutes.post('', validator.body(userSchema), async (req, res, next) => {
  try {
    const response = await UserService.createUser(req.body);
    return res.status(200).json(response);
  } catch (err) {
    controllerLogger(req.originalUrl, { body: req.body });
    next(err);
  }
});

/**
 * Updates an user.
 */
userRoutes.put('/:id', validator.body(userSchema), async (req, res, next) => {
  try {
    const { id } = req.params;
    const response = await UserService.updateUser(id, req.body);

    return res.status(200).json(response);
  } catch (err) {
    controllerLogger(req.originalUrl, { params: req.params });
    next(err);
  }
});

/**
 * Returns list of auto suggested users
 * limit: number of users to retrieve.
 * loginSubstring: query string.
 */
userRoutes.post('/auto-suggest', async (req, res, next) => {
  try {
    const response = await UserService.getSuggestedUsers(req.body);
    return res.json({ users: response });
  } catch (err) {
    controllerLogger(req.originalUrl, { params: req.body });
    next(err);
  }
});

/**
 * Soft delete a User.
 */
userRoutes.delete('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const response = await UserService.deleteUser(id);

    return res.status(200).json(response);
  } catch (err) {
    controllerLogger(req.originalUrl, { params: req.params });
    next(err);
  }
});

userRoutes.post('/addUsersToGroup', async (req, res, next) => {
  try {
    const response = await UserGroupService.createUserGroup(req.body);

    return res.status(200).json(response);
  } catch (err) {
    controllerLogger(req.originalUrl, { params: req.body });
    next(err);
  }
});

export default userRoutes;
