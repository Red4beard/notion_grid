const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/v1', // 👈 Изменили путь прокси
    createProxyMiddleware({
      target: 'https://api.notion.com',
      changeOrigin: true,
      onProxyReq: (proxyReq) => {
        // Добавляем логирование
        console.log('🔄 Прокси запрос:', proxyReq.path);
      }
    })
  );
};