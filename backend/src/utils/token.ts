import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload, SignOptions } from 'jsonwebtoken';
import configs from '../configs';
import fs from 'fs';
import path from 'path';
import User from '../models/User';

const user = new User();

export type Payload = {
  id: string;
  username: string;
};
const accessPrivateKey = path.join(
  __dirname,
  '..',
  '..',
  'keys',
  'accessToken',
  'private.key'
);
const accessPublicKey = path.join(
  __dirname,
  '..',
  '..',
  'keys',
  'accessToken',
  'public.key'
);
const refreshPrivateKey = path.join(
  __dirname,
  '..',
  '..',
  'keys',
  'refreshToken',
  'private.key'
);
const refreshPublicKey = path.join(
  __dirname,
  '..',
  '..',
  'keys',
  'refreshToken',
  'public.key'
);

export const signAccessToken = async (payload: Payload) => {
  return new Promise((resolve, reject) => {
    const options: SignOptions = {
      algorithm: 'RS256',
      expiresIn: configs.jwt_access_expire,
      issuer: 'adhamhaddad',
      audience: String(payload?.id)
    };
    fs.readFile(accessPrivateKey, 'utf8', (err, key) => {
      if (err) reject(err);
      jwt.sign(payload, key, options, (err, token) => {
        if (err) reject(err);
        resolve(token);
      });
    });
  });
};
export const signRefreshToken = async (payload: Payload) => {
  return new Promise((resolve, reject) => {
    const options: SignOptions = {
      algorithm: 'RS256',
      expiresIn: configs.jwt_refresh_expire,
      issuer: 'adhamhaddad',
      audience: String(payload?.id)
    };
    fs.readFile(refreshPrivateKey, 'utf8', (err, key) => {
      if (err) reject(err);
      jwt.sign(payload, key, options, (err, token) => {
        if (err) reject(err);
        resolve(token);
      });
    });
  });
};
export const verifyAccessToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authorization = req.headers.authorization as string;
  if (!authorization) {
    res.status(401).json({
      status: false,
      message: 'Not Authorized'
    });
  }
  const token = authorization.split(' ')[1];
  fs.readFile(accessPublicKey, 'utf8', (err, key) => {
    if (err) err.message;
    jwt.verify(token, key, { algorithms: ['RS256'] }, (err, payload) => {
      if (err)
        return res.status(401).json({
          status: false,
          message: (err as Error).message
        });
      return next();
    });
  });
};
export const verifyRefreshToken = async (refreshToken: string) => {
  return new Promise((resolve, reject) => {
    fs.readFile(refreshPublicKey, 'utf8', (err, key) => {
      if (err) reject(err);
      jwt.verify(
        refreshToken,
        key,
        { algorithms: ['RS256'] },
        (err, payload) => {
          if (err) reject(err);
          resolve(payload);
        }
      );
    });
  });
};
export const checkAccessToken = async (req: Request, res: Response) => {
  try {
    const authorization = req.headers.authorization as string;
    if (!authorization) {
      res.status(401).json({
        status: false,
        message: 'Not Authorized'
      });
    }
    const token = authorization.split(' ')[1];
    const authMe = async (id: string) => await user.authMe(id);
    fs.readFile(accessPublicKey, 'utf8', (err, key) => {
      if (err) err.message;
      jwt.verify(token, key, { algorithms: ['RS256'] }, (err, payload) => {
        if (err) {
          const decode = jwt.decode(token, { complete: true });
          // @ts-ignore
          const id = decode?.payload?.aud;
          const responseData = async () => {
            const response = await authMe(id);
            const accessToken = await signAccessToken(response);
            return res.status(200).json({
              status: true,
              data: {
                ...response,
                accessToken
              },
              message: 'Access token generated successfully.'
            });
          };
          responseData();
        } else {
          // @ts-ignore
          const id = payload.id;
          const responseData = async () => {
            const response = await authMe(id);
            res.status(200).json({
              data: response
            });
          };
          responseData();
        }
      });
    });
  } catch (err) {
    res.status(500).json({
      status: false,
      message: (err as Error).message
    });
  }
};
