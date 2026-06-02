const path = require('path');
const fs = require('fs');
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const xss = require('xss-clean');

const { connectDatabase, fallbackStore } = require('./config/db');
const { bootstrapData } = require('./services/bootstrap');
const authRoutes = require('./routes/authRoutes');
const portfolioRoutes = require('./routes/portfolioRoutes');
const blogRoutes = require('./routes/blogRoutes');
const aiRoutes = require('./routes/aiRoutes');

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;
const clientUrl = process.env.CLIENT_URL || 'http://localhost:5173';

app.use(helmet());
app.use(cors({ origin: clientUrl, credentials: true }));
app.use(express.json({ limit: '2mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(xss());
app.use(rateLimit({ windowMs: 60 * 1000, max: 120 }));

app.get('/api/health', (_req, res) => {
  res.json({
    ok: true,
    mode: fallbackStore.isFallback ? 'json-fallback' : 'mongodb',
    timestamp: new Date().toISOString()
  });
});

app.use('/api/auth', authRoutes);
app.use('/api/portfolio', portfolioRoutes);
app.use('/api/blog', blogRoutes);
app.use('/api/ai', aiRoutes);

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use((err, _req, res, _next) => {
  const status = err.statusCode || 500;
  res.status(status).json({
    message: err.message || 'Server error',
    details: process.env.NODE_ENV === 'development' ? err.stack : undefined
  });
});

async function start() {
  await connectDatabase();
  await bootstrapData();
  if (!fs.existsSync(path.join(__dirname, 'data'))) {
    fs.mkdirSync(path.join(__dirname, 'data'), { recursive: true });
  }
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
    console.log(`Database mode: ${fallbackStore.isFallback ? 'json-fallback' : 'mongodb'}`);
  });
}

start().catch((error) => {
  console.error('Failed to start server:', error);
  process.exit(1);
});
