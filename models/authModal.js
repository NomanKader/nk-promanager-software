const { poolConnect, pool, sql } = require("../config/db");

exports.getUserByEmail = async (email) => {
  await poolConnect;

  const result = await pool
    .request()
    .input("email", sql.VarChar, email)
    .query("SELECT * FROM Users WHERE Email = @email");

  return result.recordset[0]; 
};
