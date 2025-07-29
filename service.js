const db = require('../data/db');
const generateCode = require('../utils/codeGenerator');

function isValidUrl(url) {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

function createShortUrl(url, validity = 30, shortcode) {
  if (!isValidUrl(url)) {
    throw new Error('Invalid URL format.');
  }

  const code = shortcode || generateUniqueCode();
  const now = new Date();
  const expiry = new Date(now.getTime() + validity * 60000);

  if (db.has(code)) {
    throw new Error('Shortcode already in use.');
  }

  db.set(code, { url, expiry });
  return { code, expiry };
}

function generateUniqueCode() {
  let code;
  do {
    code = generateCode();
  } while (db.has(code));
  return code;
}

function resolveShortUrl(code) {
  const entry = db.get(code);
  if (!entry) throw new Error('Shortcode does not exist.');
  if (new Date() > new Date(entry.expiry)) {
    db.delete(code);
    throw new Error('Link expired.');
  }
  return entry.url;
}

module.exports = {
  createShortUrl,
  resolveShortUrl
};
