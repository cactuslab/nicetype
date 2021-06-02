module.exports = {
  root: true,
  plugins: [
    'jest',
  ],
  extends: [
    'plugin:jest/recommended',
    'airbnb-base',
  ],
  env: {
    browser: true,
    'jest/globals': true,
  },
};
