import express, { Request, Response } from 'express';
import Joi from '@hapi/joi';
import { createValidator } from 'express-joi-validation';

const router = express.Router();
const UserService = require('../services/user.service');
const validator = createValidator();

const userSchema = Joi.object({
  login: Joi.string().required(),
  password: Joi.string()
    .regex(/^[a-z0-9]+$/i)
    .required(),
  age: Joi.number().min(4).max(130).required()
});

/**
 * Get user by ID
 */
router.get('/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  const response = await UserService.getUser(+id);
  let status = 200;
  if (!response.user) {
    status = 400;
  }
  res.status(status).json(response);
});

/**
 * Get all users.
 */
router.get('', async (req: Request, res: Response) => {
  const response = await UserService.getUsers();
  res.json(response);
});

/**
 * Create user.
 * Type: ../model/User
 */
router.post(
  '',
  validator.body(userSchema),
  async (req: Request, res: Response) => {
    const response = await UserService.createUser(req.body);
    let status = 200;
    if (!response.user) {
      status = 400;
    }
    res.status(status).json(response);
  }
);

/**
 * Updates an user.
 */
router.put(
  '/:id',
  validator.body(userSchema),
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const response = await UserService.updateUser(id, req.body);
    let status = 200;
    if (!response.user) {
      status = 400;
    }
    res.status(status).json(response);
  }
);

/**
 * Returns list of auto suggested users
 * limit: number of users to retrieve.
 * loginSubstring: query string.
 */
router.post('/auto-suggest', async (req: Request, res: Response) => {
  const response = await UserService.getSuggestedUsers(req.body);
  res.json({ users: response });
});

/**
 * Soft delete a User.
 */
router.delete('/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  const response = await UserService.deleteUser(id, req.body);
  let status = 200;
  if (!response.user) {
    status = 400;
  }
  res.status(status).json(response);
});

module.exports = router;
