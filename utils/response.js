// Utility function to send success response
const sendSuccessResponse = (res, data) => {
    const response = {
      statusCode: 200,
      data,
    };
    res.json(response);
  };
  
  // Utility function to send error response
  const sendErrorResponse = (res, statusCode, message) => {
    const response = {
      statusCode,
      error: true,
      message,
    };
    res.status(statusCode).json(response);
  };
  
  module.exports = { sendSuccessResponse, sendErrorResponse };
  