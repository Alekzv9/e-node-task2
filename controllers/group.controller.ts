import express from 'express';

const router = express.Router();
const GroupService = require('../services/group.service');

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const group = await GroupService.getGroup(id);
  res.json({ group });
});

router.get('', async (req, res) => {
  const groups = await GroupService.getGroups();
  res.json({ groups });
});

router.post('', async (req, res) => {
  const response = await GroupService.createGroup(req.body);
  let status = 200;
  if (!response.group) {
    status = 400;
  }
  res.status(status).json(response);
});

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const response = await GroupService.updateGroup(id, req.body);
  let status = 200;
  if (!response.group) {
    status = 400;
  }
  res.status(status).json(response);
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const response = await GroupService.deleteGroup(id);
  let status = 200;
  if (!response.group) {
    status = 400;
  }
  res.status(status).json(response);
});

module.exports = router;
