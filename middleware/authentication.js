const { verifyToken } = require('../utils/auth');
const { sendErrorResponse } = require('../utils/response');

// Middleware to authenticate user using JWT token
const jwt = require('jsonwebtoken');

const authenticateUser = (req, res, next) => {
    const header=req.headers.authorization
    if(header)
    {
    const token = req.headers.authorization.split(" ")[1];
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {

        return res.status(401).send("Invalid token");
      }
      req.user = decoded;
      next(); // call next middleware
    })
  }else
  {
    res.send("Token is missing")
  }
};

module.exports = { authenticateUser };
