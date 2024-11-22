module.exports = {
  env: {
    node: true,
    es2021: true,
  },
  extends: ["airbnb-base"],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  rules: {
    // Customize rules based on your preferences
    "no-console": ["error", { allow: ["log", "error", "warn"] }],
    "no-unused-vars": ["error", { argsIgnorePattern: "next" }],
    "max-len": ["error", { code: 120 }],
    camelcase: "off",
    // Add other custom rules here
    "comma-dangle": ["error", "always-multiline"],
    "object-curly-spacing": ["error", "always"],
    "no-underscore-dangle": "off",
    "class-methods-use-this": "off",
  },
};
