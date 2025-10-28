require('dotenv').config();
const express = require('express');
const cors = require('cors');
const weatherRoutes = require('./routes/weather');

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());

app.use('/api/weather', weatherRoutes);
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    message: 'Weather API with Auth0 is running',
    auth0: {
      domain: process.env.AUTH0_DOMAIN,
      audience: process.env.AUTH0_AUDIENCE
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Auth0 Domain: ${process.env.AUTH0_DOMAIN}`);
  console.log(`Auth0 Audience: ${process.env.AUTH0_AUDIENCE}`);
});
