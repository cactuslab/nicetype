const { merge } = require('webpack-merge');
const common = require('./webpack.config.common');

// eslint-disable-next-line arrow-body-style
module.exports = (env) => {
  // console.log('env: ', env);

  return merge(common(env), {
    mode: 'development',
    module: {

    },
  });
};
