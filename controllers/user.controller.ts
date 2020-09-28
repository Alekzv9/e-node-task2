import express, { Request, Response } from 'express';
import Joi from '@hapi/joi';

const router = express.Router();
const UserService = require('../services/user.service');
const validator = require('express-joi-validation').createValidator({});

const userSchema = Joi.object({
  login: Joi.string().required(),
  password: Joi.string().required(),
  age: Joi.number().required(),
});

/**
 * Get all users.
 */
router.get('', (req: Request, res: Response) => {
  const users = UserService.getUsers();
  res.json({ users });
});

/**
 * Get user by ID
 */
router.get('/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  const user = UserService.getUser(+id);
  res.json({ user });
});

/**
 * Create user.
 * Type: ../model/User
 */
router.post('', validator.body(userSchema), (req: Request, res: Response) => {
  const response = UserService.createUser(req.body);
  let status = 200;
  if (!response.user) {
    status = 400;
  }
  res.status(status).json(response);
});

/**
 * Updates an user.
 */
router.put('/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  const response = UserService.updateUser(id, req.body);
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
router.post('/auto-suggest', (req: Request, res: Response) => {
  const { loginSubstring, limit } = req.body;
  const response = UserService.getAutoSuggestUsers(loginSubstring, limit);
  res.json({ users: response });
});

/**
 * Soft delete a User.
 */
router.delete('/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  const response = UserService.deleteUser(id, req.body);
  let status = 200;
  if (!response.user) {
    status = 400;
  }
  res.status(status).json(response);
});

module.exports = router;
