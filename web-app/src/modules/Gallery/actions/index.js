let ctx;

try {
  ctx = require.context(__dirname, true, /^(.*\.((js|jsx)$))[^.]*$/igm);
} catch (err) {}

module.exports = require('es6-requireindex')(ctx);
