const { defineConfig } = require('@vue/cli-service')
module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? '/frontend_belkin/'  // ← Замени на имя твоего репозитория!
    : '/',
  assetsDir: '',
};

