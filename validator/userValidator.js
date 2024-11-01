const { body } = require('express-validator');

const userValidationRules = () => {
    return [
        body('firstName').isString().withMessage('It must contain alphabets only'),
        body('lastName').isString().withMessage('It must contain alphabets only'),
        body('email').isEmail().withMessage('It must be a valid email').toLowerCase(),
        body('id').notEmpty(),
        body('password')
            .isLength({ min: 5 })
            .withMessage('It must contain at least 5 alphanumeric characters')
            .isAlphanumeric(),
    ];
};

module.exports = { userValidationRules };