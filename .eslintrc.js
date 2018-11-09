'use strict';

module.exports = {
  rules: {
    'no-cond-assign': 0, // eslint:recommended
    'no-irregular-whitespace': 2, // eslint:recommended
    'no-unexpected-multiline': 2, // eslint:recommended
    'valid-jsdoc': [2, {
      requireParamDescription: false,
      requireReturnDescription: false,
      requireReturn: false,
      prefer: {returns: 'return'},
    }],
    'curly': [2, 'multi-line'],
    'guard-for-in': 2,
    // 'no-alert': 0,
    'no-caller': 2,
    'no-extend-native': 2,

    'no-multi-str': 2,
    'no-throw-literal': 2, // eslint:recommended
    "parserOptions": {
      "ecmaVersion": 6
  },
    "ecmaVersion": 6
  },
  "env": {
    "es6": true
}
// "es6": true
};