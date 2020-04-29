module.exports = function() {
  return {
    files: [
      'src/**/*.ts',
      '!src/**/*.spec.ts',
      { pattern: 'tsconfig.*', instrument: false },
      { pattern: 'package.json', instrument: false },
    ],
    tests: ['src/**/*.spec.ts'],
    env: {
      type: 'node',
    },
    testFramework: 'jest',
    debug: false,

    setup: function(wallaby) {
      var jestConfig = require('./package.json').jest;
      delete jestConfig.transform;
      wallaby.testFramework.configure(jestConfig);
    },
  };
};
