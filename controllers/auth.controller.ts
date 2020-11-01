import express from 'express';
import { controllerLogger } from '../utils/logger';
const UserService = require('../services/auth.service');

const authRoutes = express.Router();

/**
 * Login
 */
authRoutes.post('/login', async (req, res, next) => {
  try {
    const user = await UserService.login(req.body);
    return res.json({ user });
  } catch (err) {
    controllerLogger(req.originalUrl, { params: req.body });
    next(err);
  }
});

export default authRoutes;
