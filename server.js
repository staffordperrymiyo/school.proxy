const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const app = express();

let targetUrl = 'https://search.brave.com';

app.use((req, res, next) => {
  const newTargetUrl = req.query.target;
  if (newTargetUrl) {
    targetUrl = newTargetUrl;
  }
  next();
});

app.use(
  '/',
  createProxyMiddleware({
    target: targetUrl,
    changeOrigin: true,
    secure: false,
    onProxyRes(proxyRes, req, res) {
      
    },
    onProxyReq(proxyReq, req, res) {
      
    }
  })
);

app.listen(3000, () => {
  console.log('Proxy server is running on http://localhost:3000');
});
