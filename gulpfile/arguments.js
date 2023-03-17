const minimist = require('minimist'); // 引数解析

module.exports = minimist(process.argv.slice(2), {
  string: 'env',
  default: {
    env: 'development',
  },
});
