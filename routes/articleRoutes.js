const express = require('express');
const router = express.Router();
const { createArticle, getAllArticles } = require('../controllers/articleController');
const { authenticateUser } = require('../middleware/authentication');

// Create article route
router.post('/users/:userId/articles', authenticateUser, createArticle);

// Get all articles route
router.get('/articles', authenticateUser, getAllArticles);

module.exports = router;
