/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
  root: true,
  env: {
      node: true
  },
  'extends': [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/eslint-config-prettier/skip-formatting',
  ],
  globals: {
    ElMessage: 'readonly',
    ElMessageBox: 'readonly',
    ElLoading: 'readonly',
	},
  plugins: [
    'vue',
  ],
  rules: {
    'template-curly-spacing': 'off',
    indent: ['off', 4],
    'no-tabs': 'off',
    'no-debugger': 'off',
    'space-before-function-paren': ['error', 'always'],
    'prefer-promise-reject-errors': [
        'error', {
            allowEmptyReject: true
        }
    ],
    'vue/multi-word-component-names': 0,
    'no-unused-vars':["error", {
        "vars": "all",
        "args": "none",
    }],
    // 'no-undef': 0,
    "object-curly-spacing": [2, "always"],
    "comma-spacing": [2, { "before": false, "after": true }],
    "semi": 'off'
  },
  parserOptions: {
    ecmaVersion: 'latest'
  }
}
