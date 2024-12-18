// netlify/functions/recommend.js
const { createProxyMiddleware } = require('http-proxy-middleware');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { get_results } = require('../backend/recommender_system'); // Assuming you still have this

const app = express();
app.use(cors());  // Enable CORS
app.use(bodyParser.json()); // Parse incoming JSON requests

app.get('/recommend', async (req, res) => {
  const user_input = req.query.query;  // Extract the query parameter
  try {
    const recommendations = await get_results(user_input);  // Call your recommendation function
    res.json({ recommendations });
  } catch (error) {
    console.error('Error fetching recommendations:', error);
    res.status(500).json({ error: 'Failed to fetch recommendations' });
  }
});

// The function should export the app as a handler
exports.handler = app;

