const express = require('express');
const app = express();
const connectToDatabase = require('./config/database');
const userRoutes = require('./routes/userRoutes');
const articleRoutes = require('./routes/articleRoutes');

// Connecting to database
connectToDatabase();

// Middleware to parse JSON body
app.use(express.json());

// Mount routes
app.use('/api', userRoutes);
app.use('/api', articleRoutes);

// Define the port number
const port = process.env.PORT || 3000;

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

