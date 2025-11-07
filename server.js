const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

// 允许的 User-Agent 关键字
const allowedAgents = [
  'MyOTTPlayer', // 替换成你的OTT Player User-Agent
];

// 中间件：只允许OTT Player访问
app.use((req, res, next) => {
  const ua = req.headers['user-agent'] || '';
  const allowed = allowedAgents.some(agent => ua.includes(agent));
  if (!allowed) {
    return res.status(403).send('Access Denied: Only OTT Player allowed');
  }
  next();
});

// 静态文件服务
app.use(express.static(path.join(__dirname, 'public')));

app.listen(port, () => {
  console.log(`OTT-protected site running at http://localhost:${port}`);
});
