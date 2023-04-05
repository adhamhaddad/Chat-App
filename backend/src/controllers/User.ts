import { Request, Response } from 'express';
import User from '../models/User';
import {
  signAccessToken,
  signRefreshToken,
  verifyRefreshToken
} from '../utils/token';

const user = new User();

export const createUser = async (req: Request, res: Response) => {
  try {
    const response = await user.createUser(req.body);
    res.status(201).json({
      status: true,
      data: { ...response },
      message: 'User created successfully.'
    });
  } catch (error) {
    res.status(400).json({
      status: false,
      message: (error as Error).message
    });
  }
};
export const getUsers = async (req: Request, res: Response) => {
  try {
    const response = await user.getUsers();
    res.status(200).json({
      status: true,
      data: response,
      message: 'Users fetched successfully.'
    });
  } catch (error) {
    res.status(400).json({
      status: false,
      message: (error as Error).message
    });
  }
};
export const getUser = async (req: Request, res: Response) => {
  try {
    const response = await user.getUser(req.params.id);
    res.status(200).json({
      status: true,
      data: { ...response },
      message: 'User fetched successfully.'
    });
  } catch (error) {
    res.status(400).json({
      status: false,
      message: (error as Error).message
    });
  }
};
export const updateUser = async (req: Request, res: Response) => {
  try {
    const response = await user.updateUser(req.params.id, req.body);
    res.status(203).json({
      status: true,
      data: { ...response },
      message: 'User updated successfully.'
    });
  } catch (error) {
    res.status(400).json({
      status: false,
      message: (error as Error).message
    });
  }
};
export const updatePassword = async (req: Request, res: Response) => {
  try {
    await user.updatePassword(req.params.id, req.body);
    res.status(203).json({
      status: true,
      message: 'Password updated successfully.'
    });
  } catch (error) {
    res.status(400).json({
      status: false,
      message: (error as Error).message
    });
  }
};
export const deleteUser = async (req: Request, res: Response) => {
  try {
    const response = await user.deleteUser(req.params.id);
    res.status(200).json({
      status: true,
      data: { ...response },
      message: 'User deleted successfully.'
    });
  } catch (error) {
    res.status(400).json({
      status: false,
      message: (error as Error).message
    });
  }
};
export const authUser = async (req: Request, res: Response) => {
  try {
    const response = await user.authUser(req.body);
    const accessToken = await signAccessToken({ ...response });
    const refreshToken = await signRefreshToken({ ...response });
    res.status(200).json({
      status: true,
      data: { ...response, accessToken, refreshToken },
      message: 'User authenticated successfully.'
    });
  } catch (error) {
    res.status(400).json({
      status: false,
      message: (error as Error).message
    });
  }
};

export const refreshToken = async (req: Request, res: Response) => {
  try {
    const { refreshToken: token } = req.body;
    if (!token) throw 'Bad request';

    const payload = await verifyRefreshToken(token);
    console.log(payload);
    const accessToken = await signAccessToken({
      // @ts-ignore
      id: payload?.id,
      // @ts-ignore
      username: payload?.username
    });
    res.status(200).json({
      data: { accessToken }
    });
  } catch (error) {
    res.status(401).json({
      status: false,
      message: error
    });
  }
};
