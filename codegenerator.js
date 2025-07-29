const crypto = require('crypto');

function generateCode(length = 6) {
  return crypto.randomBytes(length).toString('base64url').slice(0, length);
}

module.exports = generateCode;
