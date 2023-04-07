import { Request, Response, NextFunction } from 'express';
import { check } from 'express-validator';
import { validate } from '../validationResult';

export const validateCreateAvatar = [
  check('avatar')
    .exists()
    .withMessage("avatar does'nt exists in the request file")
    .notEmpty()
    .withMessage('avatar is empty')
    .isString()
    .withMessage('avatar must be string'),
  check('user_id')
    .exists()
    .withMessage("user_id does'nt exists")
    .notEmpty()
    .withMessage('user_id is empty')
    .isNumeric()
    .withMessage('user_id must be number'),
  (req: Request, res: Response, next: NextFunction) => validate(req, res, next)
];
