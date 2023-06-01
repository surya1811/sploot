const express = require('express');
const router = express.Router();
const { signup, login,updateProfile } = require('../controllers/userController');
const { authenticateUser } = require('../middleware/authentication');
// signup route
router.post('/signup', signup);

//login route
router.post('/login', login);

//profile update route
router.patch('/users/:userId', updateProfile,authenticateUser);

module.exports = router;
