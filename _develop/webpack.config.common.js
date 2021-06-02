const path = require('path');
const pkg = require('../package.json');

module.exports = (env) => ({
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: `${pkg.name}.js`,
    library: {
      name: `${pkg.name}`,
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
