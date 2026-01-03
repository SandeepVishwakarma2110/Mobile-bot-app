// server.js (ES6 module)

import 'dotenv/config'; // automatically loads .env
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

// Import createApp from backend
import { createApp } from './backend/index.js';

// Get __dirname in ES6 modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = process.env.PORT || 5001;

// Main app
const app = express();

/* ================= BACKEND ================= */
const apiApp = createApp();
app.use('/', apiApp);

/* ================= FRONTEND BUILD ================= */
const frontendPath = path.join(__dirname, 'frontend', 'dist');
app.use(express.static(frontendPath));

/* ================= SPA FALLBACK ================= */
app.use((req, res) => {
  res.sendFile(path.join(frontendPath, 'index.html'));
});

/* ================= START ================ */
app.listen(PORT, () => {
  console.log(`🚀 Server is running at http://localhost:${PORT}`);
});
