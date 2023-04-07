import { body, ValidationChain } from 'express-validator';

const rules: ValidationChain[] = [
  body('status')
    .exists()
    .withMessage('MISSING')
    .not()
    .isEmpty()
    .withMessage('IS_EMPTY')
];
export default rules;
