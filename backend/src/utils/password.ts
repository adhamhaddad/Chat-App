import bcrypt from 'bcrypt';
import configs from '../configs';

export const hashPassword = (password: string) =>
  bcrypt.hash(`${configs.peper}${password}${configs.peper}`, configs.salt);

export const comparePassword = (password: string, hash: string) =>
  bcrypt.compare(`${configs.peper}${password}${configs.peper}`, hash);
