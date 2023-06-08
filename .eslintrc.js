module.exports = {
  extends: ["eslint:recommended", "prettier"],
  parserOptions: {
    ecmaVersion: 2023,
    sourceType: "script"
  },
  env: {
    node: true, // Add this line to specify the code is running in a Node.js environment
    es6: true
  }
}
