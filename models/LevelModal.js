const { poolConnect, pool } = require('../config/db');

// Get all levels
exports.getAllLevels = async () => {
  await poolConnect;
  const result = await pool.request().query('SELECT * FROM Levels');
  return result.recordset;
};

