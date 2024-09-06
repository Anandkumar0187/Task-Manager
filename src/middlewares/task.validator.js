import { body, validationResult } from 'express-validator';

// Validation rules for creating and updating tasks
export const taskValidationRules = [
    body('title')
      .notEmpty().withMessage('Title is required'),  // Title must not be empty
    body('description')
      .notEmpty().withMessage('Description is required')  // Description must not be empty
      .isString().withMessage('Description must be a string'),
    body('dueDate')
      .notEmpty().withMessage('Due date is required')  // DueDate must not be empty
      .isISO8601().withMessage('Due date must be a valid ISO 8601 date'), // Valid date format
    body('priority')
      .notEmpty().withMessage('Priority is required')  // Priority must not be empty
      .isIn(['High', 'Medium', 'Low']).withMessage('Priority must be one of High, Medium, or Low'),  // Priority must be one of the allowed values
  ];

// Middleware to handle validation errors
export const validateRequest = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};
