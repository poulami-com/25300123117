const express = require('express');
const bodyParser = require('body-parser');
const logger = require('./middleware/logger');
const urlRoutes = require('./routes/shorturls');
const { resolveShortUrl } = require('./services/urlService');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(logger);
app.use('/shorturls', urlRoutes);

// Redirection
app.get('/:code', (req, res) => {
  const { code } = req.params;

  try {
    const originalUrl = resolveShortUrl(code);
    res.redirect(originalUrl);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
});

app.listen(PORT, () => {
  // No console logging allowed.
});
