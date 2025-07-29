const express = require('express');
const router = express.Router();
const { createShortUrl } = require('../services/urlService');

router.post('/', (req, res) => {
  const { url, validity, shortcode } = req.body;

  try {
    const { code, expiry } = createShortUrl(url, validity, shortcode);
    res.status(201).json({
      shortLink: `${req.protocol}://${req.get('host')}/${code}`,
      expiry: expiry.toISOString()
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
