require('dotenv').config();

const apiKey = process.env.API_KEY;

const checkApiKey = (req:any, res:any, next:any) => {
  if (!apiKey) {
    return res.status(500).json({ error: 'API key is missing!' });
  }

  // Attach API key to request for downstream usage
  req.apiKey = apiKey;
  next();
};

module.exports = checkApiKey;
