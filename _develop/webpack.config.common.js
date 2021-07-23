const path = require('path');
const pkg = require('../package.json');

// This is messy but whatever
const ORGANISATION_SCOPE = '@cactuslab/';
const PACKAGE_NAME = `${pkg.name}`.replace(ORGANISATION_SCOPE, '');

module.exports = (env) => ({
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: `${PACKAGE_NAME}.js`,
    library: {
      name: `${PACKAGE_NAME}`,
      type: 'umd',
    },
    clean: true,
  },
  target: 'browserslist',
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  },
  stats: {
    colors: true,
  },
  // devtool: 'source-map',
});
