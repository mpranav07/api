const { body } = require('express-validator/check');
const User = require('../models/user.model');
const Category = require('../models/category.model');

exports.signup = [
    body('email')
    .isEmail()
    .withMessage('Please enter a valid email.')
    .custom((value, { req }) => {
        return User.findOne({ email: value }).then(userDoc => {
            if (userDoc) {
            return Promise.reject('E-Mail address already exists!');
            }
        });
    })
    .normalizeEmail(),
    body('password')
    .trim()
    .isLength({ min: 5 }),
    body('name')
    .trim()
    .not()
    .isEmpty()
];

exports.category = [
    body('name')
    .trim()
    .not()
    .isEmpty()
    .custom((value, { req }) => {
        return Category.findOne({ name: value }).then(category => {
            if (category) {
            return Promise.reject('Category already exists!');
            }
        });
    }),
    body('description')
    .trim()    
    .not()
    .isEmpty()
];