require('dotenv').config();

const express = require('express');
const cors = require('cors');
const { createProxyMiddleware } = require('http-proxy-middleware');

const simpleRequestLogger = (proxyServer, options) => {
  proxyServer.on('proxyReq', (proxyReq, req, res) => {
    console.log(`${new Date().toISOString()} ${req.method} ${req.url}`);
  });
};

const app = express();

app.use(cors());
app.use(
  '/',
  createProxyMiddleware({
    target: process.env.URL,
    changeOrigin: true,
    plugins: [simpleRequestLogger],
  })
);

app.listen(process.env.PORT || 3000);
