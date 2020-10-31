import express from 'express';

const router = express.Router();
const GroupService = require('../services/group.service');

router.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const group = await GroupService.getGroup(id);
    return res.json({ group });
  } catch (err) {
    next(err);
  }
});

router.get('', async (req, res, next) => {
  try {
    const groups = await GroupService.getGroups();
    return res.json({ groups });
  } catch (err) {
    next(err);
  }
});

router.post('', async (req, res, next) => {
  try {
    const response = await GroupService.createGroup(req.body);

    return res.status(200).json(response);
  } catch (err) {
    next(err);
  }
});

router.put('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const response = await GroupService.updateGroup(id, req.body);

    return res.status(200).json(response);
  } catch (err) {
    next(err);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const response = await GroupService.deleteGroup(id);

    return res.status(200).json(response);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
