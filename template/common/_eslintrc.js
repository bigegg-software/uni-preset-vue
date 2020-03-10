module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: ["plugin:vue/essential", "eslint:recommended", "@vue/prettier"],
  parserOptions: {
    parser: "babel-eslint"
  },
  globals: {
    // uni-app全局变量
    uni: "readonly",
    // wx全局变量
    wx: "readonly",
    getApp: "readonly",
    // 微信引入插件全局方法
    requirePlugin: "readonly"
  },
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-unused-vars": "warn",
    "no-empty": "warn",
    "vue/no-unused-components": "warn",
    "vue/no-parsing-error": "warn",
    "no-async-promise-executor":"warn"
  }
};
