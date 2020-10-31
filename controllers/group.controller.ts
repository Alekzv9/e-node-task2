import express from 'express';
import { controllerLogger } from '../utils/logger';

const router = express.Router();
const GroupService = require('../services/group.service');

router.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const group = await GroupService.getGroup(id);
    return res.json({ group });
  } catch (err) {
    controllerLogger(req.originalUrl, { params: req.params });
    next(err);
  }
});

router.get('', async (req, res, next) => {
  try {
    const groups = await GroupService.getGroups();
    return res.json({ groups });
  } catch (err) {
    controllerLogger(req.originalUrl);
    next(err);
  }
});

router.post('', async (req, res, next) => {
  try {
    const response = await GroupService.createGroup(req.body);

    return res.status(200).json(response);
  } catch (err) {
    controllerLogger(req.originalUrl, { params: req.body });
    next(err);
  }
});

router.put('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const response = await GroupService.updateGroup(id, req.body);

    return res.status(200).json(response);
  } catch (err) {
    controllerLogger(req.originalUrl, { params: req.params });
    next(err);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const response = await GroupService.deleteGroup(id);

    return res.status(200).json(response);
  } catch (err) {
    controllerLogger(req.originalUrl, { params: req.params });
    next(err);
  }
});

module.exports = router;
