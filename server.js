// server.js
const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const app = express();

const targetUrl = 'https://www.roblox.com';

app.use(
  '/',
  createProxyMiddleware({
    target: targetUrl,
    changeOrigin: true,
    secure: false, 
    onProxyRes(proxyRes, req, res) {

    }
  })
);

// Start the server on port 3000
app.listen(3000, () => {
  console.log('Proxy server is running on http://localhost:3000');
});
