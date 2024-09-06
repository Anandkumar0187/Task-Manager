import { body } from 'express-validator';

export const userValidator = [
  body('email')
    .isEmail().withMessage('Invalid email address')
    .normalizeEmail(),

  body('userName')
    .isLength({ min: 3 }).withMessage('Username must be at least 3 characters long')
    .isAlphanumeric().withMessage('Username must be alphanumeric')
    .trim(),

  body('password')
    .isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
    .matches(/[0-9]/).withMessage('Password must contain a number')
    .matches(/[a-z]/).withMessage('Password must contain a lowercase letter')
    .matches(/[A-Z]/).withMessage('Password must contain an uppercase letter')
    .matches(/[@$!%*?&]/).withMessage('Password must contain a special character')
    .trim(),
];