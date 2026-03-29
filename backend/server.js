require('dotenv').config();
const express    = require('express');
const cors       = require('cors');
const notesRoute = require('./routes/notes');

const app  = express();
const PORT = process.env.PORT || 3000;

// ─── Middleware ───────────────────────────────────────────────────────────────
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ─── Request logger (simple) ─────────────────────────────────────────────────
app.use((req, _res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// ─── Routes ───────────────────────────────────────────────────────────────────
app.use('/api/notes', notesRoute);

// Health check
app.get('/api/health', (_req, res) => {
  res.json({ success: true, message: 'Notes API is running 🚀', timestamp: new Date() });
});

// 404 handler
app.use((_req, res) => {
  res.status(404).json({ success: false, message: 'Endpoint tidak ditemukan.' });
});

// ─── Start Server ─────────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`\n🚀 Notes API Server running on http://localhost:${PORT}`);
  console.log(`📋 Endpoints:`);
  console.log(`   GET    /api/health`);
  console.log(`   GET    /api/notes`);
  console.log(`   GET    /api/notes/:id`);
  console.log(`   POST   /api/notes`);
  console.log(`   PUT    /api/notes/:id`);
  console.log(`   DELETE /api/notes/:id\n`);
});
