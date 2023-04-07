import { Request, Response, NextFunction } from 'express';
import { check } from 'express-validator';
import { validate } from '../validationResult';

export const validateDeleteUser = [
  check('id')
    .exists()
    .withMessage('id is missing from parameters')
    .notEmpty()
    .withMessage('id is empty')
    .isString(),
  (req: Request, res: Response, next: NextFunction) => validate(req, res, next)
];
