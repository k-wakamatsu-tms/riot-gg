const { createProxyMiddleware } = require('http-proxy-middleware')

module.exports = function (app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://jp1.api.riotgames.com',
      changeOrigin: true,
    })
  )
}
