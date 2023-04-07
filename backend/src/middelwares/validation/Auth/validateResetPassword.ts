import { Request, Response, NextFunction } from 'express';
import { check, body } from 'express-validator';
import { validate } from '../validationResult';

export const validateResetPassword = [
  check('id')
    .exists()
    .withMessage('id is missing from the parameters')
    .notEmpty()
    .withMessage('Email is empty'),
  body('password')
    .exists()
    .withMessage('Password is missing from the body')
    .notEmpty()
    .withMessage('Email is empty')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters long'),
  (req: Request, res: Response, next: NextFunction) => validate(req, res, next)
];
