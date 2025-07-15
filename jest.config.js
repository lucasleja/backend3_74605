/** @type {import('jest').Config} */
const config = {
  transform: {
    '^.+\\.js$': 'babel-jest',
  },
  transformIgnorePatterns: [
  ],
  testMatch: [
    "**/test/**/*.test.js"
  ],
  moduleNameMapper: {
    "^(\\.{1,2}/.*)\\.js$": "$1"
  },
  testTimeout: 10000,
};

export default config;