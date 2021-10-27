const express = require('express');
const router = express.Router();
const CategoryController = require('../controllers/category.controller');
const FormValidation = require('../validations/form.validation');
const AuthMiddleware = require('../middlewares/auth.middleware');

router.post('/', AuthMiddleware, FormValidation.category, CategoryController.createCategory);

module.exports = router;
