require('dotenv').config();
const express = require('express');
const { poolConnect } = require('./config/db');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Test DB connection on startup
poolConnect
  .then(() => console.log('✅ MSSQL Database connected'))
  .catch((err) => console.error('❌ MSSQL connection error:', err));

// Routes
const userRoutes = require('./routes/user');
app.use('/users', userRoutes);

const authRoutes = require('./routes/auth');
app.use('/auth', authRoutes);

const levelRoutes = require('./routes/level');
app.use('/levels', levelRoutes);

const projectRoutes = require('./routes/project');
app.use('/projects', projectRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
