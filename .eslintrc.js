'use strict';

module.exports = {
  rules: {
    // The rules below are listed in the order they appear on the eslint
    // rules page. All rules are listed to make it easier to keep in sync
    // as new ESLint rules are added.
    // http://eslint.org/docs/rules/
    // - Rules in the `eslint:recommended` ruleset that aren't specifically
    //   mentioned by the google styleguide are listed but commented out (so
    //   they don't override a base ruleset).
    // - Rules that are recommended but contradict the Google styleguide
    //   are explicitely set to the Google styleguide value.

    // Possible Errors
    // http://eslint.org/docs/rules/#possible-errors
    // ---------------------------------------------
    // 'for-direction': 0,
    // 'no-await-in-loop': 0,
    // 'no-compare-neg-zero': 2, // eslint:recommended
    'no-cond-assign': 0, // eslint:recommended
    // 'no-console': 2, // eslint:recommended
    // 'no-constant-condition': 2, // eslint:recommended
    // 'no-control-regex': 2, // eslint:recommended
    // 'no-debugger': 2, // eslint:recommended
    // 'no-dupe-args': 2, // eslint:recommended
    // 'no-dupe-keys': 2, // eslint:recommended
    // 'no-duplicate-case': 2, // eslint:recommended
    // 'no-empty': 2, // eslint:recommended
    // 'no-empty-character-class': 2, // eslint:recommended
    // 'no-ex-assign': 2, // eslint:recommended
    // 'no-extra-boolean-cast': 2, // eslint:recommended
    // 'no-extra-parens': 0,
    // 'no-extra-semi': 2, // eslint:recommended
    // 'no-func-assign': 2, // eslint:recommended
    // 'no-inner-declarations': 2, // eslint:recommended
    // 'no-invalid-regexp': 2, // eslint:recommended
    'no-irregular-whitespace': 2, // eslint:recommended
    // 'no-obj-calls': 2, // eslint:recommended
    // 'no-prototype-builtins': 0,
    // 'no-regex-spaces': 2, // eslint:recommended
    // 'no-sparse-arrays': 2, // eslint:recommended
    // 'no-template-curly-in-string': 0,
    'no-unexpected-multiline': 2, // eslint:recommended
    // 'no-unreachable': 2, // eslint:recommended
    // 'no-unsafe-finally': 2, // eslint:recommended
    // 'no-unsafe-negation': 0,
    // 'use-isnan': 2 // eslint:recommended
    'valid-jsdoc': [2, {
      requireParamDescription: false,
      requireReturnDescription: false,
      requireReturn: false,
      prefer: {returns: 'return'},
    }],
    // 'valid-typeof': 2 // eslint:recommended


    // Best Practices
    // http://eslint.org/docs/rules/#best-practices
    // --------------------------------------------

    // 'accessor-pairs': 0,
    // 'array-callback-return': 0,
    // 'block-scoped-var': 0,
    // 'class-methods-use-this': 0,
    // 'complexity': 0,
    // 'consistent-return': 0
    // TODO(philipwalton): add an option to enforce braces with the
    // exception of simple, single-line if statements.
    'curly': [2, 'multi-line'],
    // 'default-case': 0,
    // 'dot-location': 0,
    // 'dot-notation': 0,
    // 'eqeqeq': 0,
    'guard-for-in': 2,
    // 'no-alert': 0,
    'no-caller': 2,
    // 'no-case-declarations': 2, // eslint:recommended
    // 'no-div-regex': 0,
    // 'no-else-return': 0,
    // 'no-empty-function': 0,
    // 'no-empty-pattern': 2, // eslint:recommended
    // 'no-eq-null': 0,
    // 'no-eval': 0,
    'no-extend-native': 2,

    'no-multi-str': 2,
    // 'no-param-reassign': 0,
    // 'no-proto': 0,
    // 'no-redeclare': 2, // eslint:recommended
    // 'no-restricted-properties': 0,
    // 'no-return-assign': 0,
    // 'no-script-url': 0,
    // 'no-self-assign': 2, // eslint:recommended
    // 'no-self-compare': 0,
    // 'no-sequences': 0,
    'no-throw-literal': 2, // eslint:recommended

    // Node.js and CommonJS
    // http://eslint.org/docs/rules/#nodejs-and-commonjs
    // -------------------------------------------------
    // 'callback-return': 0,
    // 'global-require': 0,
    // 'handle-callback-err': 0,
    // 'no-buffer-constructor': 0,
    // 'no-mixed-requires': 0,
    // 'no-new-require': 0,
    // 'no-path-concat': 0,
    // 'no-process-env': 0,
    // 'no-process-exit': 0,
    // 'no-restricted-modules': 0,
    // 'no-sync': 0,
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