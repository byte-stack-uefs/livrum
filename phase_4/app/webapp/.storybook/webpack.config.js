const path = require('path');

module.exports = async ({ config }) => {
  config.resolve.alias['@'] = path.resolve(__dirname, '../');
  return config;
};
