const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {filename: 'blurstyle.min.js', 
  path: path.resolve(__dirname, 'build'),},
  mode: 'production',
};