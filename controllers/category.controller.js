// External library
const { validationResult } = require('express-validator/check');

// Models
const Category = require('../models/category.model');

exports.createCategory = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = new Error('Validation failed, entered data is incorrect.');
      error.statusCode = 422;
      throw error;
    }
    
    const name = req.body.name;
    const description = req.body.description;
    
    const category = new Category({
        name: name,
        description: description,
        creator: req.userId
    });
    category.save()
    .then(result => {
        res.status(201).json({
          message: 'Category created successfully!',
          result: result
        });
    })
    .catch(err => {
        if (!err.statusCode) {
          err.statusCode = 500;
        }
        next(err);
    });
};