const Article = require('../models/article');
const User = require('../models/user');
const { sendSuccessResponse, sendErrorResponse } = require('../utils/response');

// Create an article controller
const createArticle = async (req, res) => {
  try {
    const { userId } = req.params;
    const { title, description } = req.body;

     // Validate input
     if (!title || !description) {
        return sendErrorResponse(res, 400, 'Missing required fields');
      }
  
    // Check if the user exists
    const user = await User.findById(userId);
    if (!user) {
      return sendErrorResponse(res, 404, 'User not found');
    }

  const existingArticle=await Article.findOne({title});
  if(existingArticle){
    return sendErrorResponse(res, 409, 'Article already exists');
  }
    // Create the article
    const article = new Article({ title, description, author: userId });
    await article.save()

    sendSuccessResponse(res, article);
  } catch (error) {
    sendErrorResponse(res, 500, 'Internal server error');
  }
};

const getAllArticles = async (req, res) => {
  try {
    // Fetch all articles from the database
    const articles = await Article.find().populate('author', 'name');

    // Send success response with the articles
    res.json({
      statusCode: 200,
      data: {
        articles,
      },
      error: null,
      message: 'All articles fetched successfully',
    });
  } catch (error) {
    console.error('Error fetching articles:', error);
    res.status(500).json({
      statusCode: 500,
      data: null,
      error: 'Internal server error',
      message: 'Failed to fetch articles',
    });
  }
};


module.exports = { createArticle, getAllArticles };
