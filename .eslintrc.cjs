module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
  settings: { react: { version: '18.2' } },
  plugins: ['react-refresh'],
  rules: {
    "react-refresh/only-export-components": [
      "warn",
      { allowConstantExport: true },
    ],
    "react/prop-types": "off",
    "no-unused-vars": "warn",
    "react/jsx-filename-extension": [1, { extensions: [".jsx"] }],
    "react/react-in-jsx-scope": "off",
    semi: ["warn", "always"],
    "no-console": [
      "warn",
      { allow: ["warn", "error"] }, // Allow console.warn and console.error
    ],
  },
}
