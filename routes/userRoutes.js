const express = require('express');
const router = express.Router();
const { signup, login } = require('../controllers/userController');

// signup route
router.post('/signup', signup);

//login route
router.post('/login', login);

module.exports = router;
