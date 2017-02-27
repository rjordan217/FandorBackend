var path = require('path');

module.exports = {
  context: __dirname,
  entry: './frontend_lite/launchApp.js',
  output: {
    path: path.join(__dirname, 'app', 'assets', 'javascripts'),
    filename: 'index.js'
  },
  devtool: 'source-map',
  resolve: {
    extensions: ['.js']
  }
};
