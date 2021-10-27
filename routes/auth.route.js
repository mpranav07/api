const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/auth.controller');
const FormValidation = require('../validations/form.validation');

router.post('/signup', FormValidation.signup, AuthController.signup);
router.post('/login', AuthController.login);

module.exports = router;
