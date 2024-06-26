const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
const { TwitterClient } = require('twitter-api-client');

dotenv.config();

const app = express();
app.use(bodyParser.json());
app.use(cors());

const twitterClient = new TwitterClient({
  apiKey: process.env.TWITTER_CONSUMER_KEY,
  apiSecret: process.env.TWITTER_CONSUMER_SECRET,
  accessToken: process.env.TWITTER_ACCESS_TOKEN,
  accessTokenSecret: process.env.TWITTER_ACCESS_TOKEN_SECRET
});

// Add error handling
if (!process.env.TWITTER_CONSUMER_KEY || !process.env.TWITTER_CONSUMER_SECRET || !process.env.TWITTER_ACCESS_TOKEN || !process.env.TWITTER_ACCESS_TOKEN_SECRET) {
  console.error('Twitter API keys are missing or invalid.');
  process.exit(1);
}

// Example route for OAuth with Twitter
app.post('/api/v1/auth/twitter/reverse', async (req, res) => {
  try {
    const response = await twitterClient.oauth.requestToken({
      oauth_callback: req.body.callback_url
    });
    res.json(response);
  } catch (error) {
    console.error('Error getting Twitter request token:', error);
    res.status(500).json({ error: 'Failed to retrieve Twitter request token' });
  }
});

app.post('/api/v1/auth/twitter', async (req, res) => {
  try {
    const { oauth_token, oauth_verifier } = req.body;
    const response = await twitterClient.oauth.accessToken({
      oauth_token,
      oauth_verifier
    });
    // Handle response and authentication logic
    res.json(response);
  } catch (error) {
    console.error('Error exchanging Twitter request token for access token:', error);
    res.status(500).json({ error: 'Failed to exchange Twitter request token for access token' });
  }
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
