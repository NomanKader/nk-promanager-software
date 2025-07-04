const { poolConnect, pool } = require('../config/db');

// Get user by email (for login)
exports.getUserByEmail = async (email) => {
  await poolConnect;
  const result = await pool.request()
    .input("email", email)
    .query("SELECT * FROM Users WHERE email = @email");
  return result.recordset[0];
};

// Get all users
exports.getAllUsers = async (businessName) => {
  await poolConnect;

  try {
    const result = await pool
      .request()
      .input("businessName", businessName)
      .query("SELECT * FROM Users WHERE BusinessName = @businessName"); // ✅ Fixed case

    return result.recordset;
  } catch (err) {
    console.error("SQL ERROR:", err);
    throw err;
  }
};



// Create user (all fields)
exports.createUser = async ({
  username,
  email,
  password,
  phone_number,
  address,
  birth_date,
  marital_status,
  cv,
  position_title,
  level_id,
  business_name
}) => {
  await poolConnect;
  await pool.request()
    .input("UserName", username)
    .input("Email", email)
    .input("Password", password) 
    .input("PhoneNumber", phone_number)
    .input("Address", address)
    .input("BirthDate", birth_date)
    .input("MaritalStatus", marital_status)
    .input("CV", cv)
    .input("PositionsTitle", position_title)
    .input("LevelId", level_id)
    .input("BusinessName", business_name)
    .query(`
      INSERT INTO Users (
        UserName, Email,Password, PhoneNumber, Address, BirthDate, MaritalStatus,
        CV, PositionsTitle, LevelId, BusinessName, CreateDate, UpdateDate
      ) VALUES (
        @UserName, @Email, @Password,@PhoneNumber, @Address, @BirthDate, @MaritalStatus,
        @CV, @PositionsTitle, @LevelId, @BusinessName, GETDATE(), GETDATE()
      )
    `);
};

// Update user
exports.updateUser = async (userId, updateData) => {
  await poolConnect;
  const request = pool.request().input("id", userId);
  let updates = [];

  for (const key in updateData) {
    request.input(key, updateData[key]);
    updates.push(`${key} = @${key}`);
  }

  if (updates.length === 0) return false;

  const query = `UPDATE Users SET ${updates.join(', ')} WHERE UserId = @id`;
  const result = await request.query(query);
  return result.rowsAffected[0] > 0;
};

// Delete user
exports.deleteUser = async (userId) => {
  await poolConnect;
  const result = await pool.request()
    .input("id", userId)
    .query("DELETE FROM Users WHERE UserId = @id");
  return result.rowsAffected[0] > 0;
};

exports.getUserById = async (userId) => {
  await poolConnect;

  const result = await pool
    .request()
    .input("id", userId)
    .query("SELECT * FROM Users WHERE UserId = @id");

  return result.recordset[0]; // return the single user object or undefined
};
