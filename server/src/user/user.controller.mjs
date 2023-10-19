import express from 'express';
import * as userService from './user.service.mjs';



export const userController = express.Router();

userController.get('/:userId', async (req, res) => {
  const userId = req.params.userId;
  const user = await userService.readUser(userId);
  res.status(200).json(user);
});

userController.get('/:userId/friends', async (req, res) => {
  const userId = req.params.userId;
  const friends = await userService.listLatestFriends(userId);
  res.status(200).json(friends);
});
