const bcrypt = require('bcrypt');
const User = require('../models/user');
const { generateToken } = require('../utils/auth');
const { sendSuccessResponse, sendErrorResponse } = require('../utils/response');

// User signup controller
const signup = async (req, res) => {
  try {
    // Extract user data from request body
    const { email, password, name, age } = req.body;

    // Validate input
    if (!email || !password || !name || !age) {
      return sendErrorResponse(res, 400, 'Missing required fields');
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return sendErrorResponse(res, 400, 'User already exists');
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the user
    const user = new User({ email, password: hashedPassword, name, age });
    await user.save();

    // Generate JWT token
    const token = generateToken(user._id);

    // Send success response with token
    sendSuccessResponse(res, { token });
  } catch (error) {
    sendErrorResponse(res, 500, 'Internal server error');
  }
};

// User login controller
const login = async (req, res) => {
  try {
    // Extract user data from request body
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return sendErrorResponse(res, 400, 'Missing required fields');
    }

    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return sendErrorResponse(res, 404, 'User not found');
    }

    // Compare passwords
    const passwordsMatch = await bcrypt.compare(password, user.password);
    if (!passwordsMatch) {
      return sendErrorResponse(res, 401, 'Invalid credentials');
    }

    // Generate JWT token
    const token = generateToken(user._id);

    // Send success response with token
    sendSuccessResponse(res, { token });
  } catch (error) {
    sendErrorResponse(res, 500, 'Internal server error');
  }
};

module.exports = { signup, login };
