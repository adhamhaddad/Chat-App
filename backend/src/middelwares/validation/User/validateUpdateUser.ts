import { Request, Response, NextFunction } from 'express';
import { check, body } from 'express-validator';
import { validate } from '../validationResult';

export const validateUpdateUser = [
  check('id')
    .exists()
    .withMessage('id is missing from parameters')
    .notEmpty()
    .withMessage('id is empty')
    .isString(),
  (req: Request, res: Response, next: NextFunction) => validate(req, res, next)
];
