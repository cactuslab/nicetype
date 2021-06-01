module.exports = {
  root: true,
  plugins: [
    'jasmine',
  ],
  extends: [
    'plugin:jasmine/recommended',
    'airbnb-base',
  ],
  env: {
    jasmine: true,
  },
};
