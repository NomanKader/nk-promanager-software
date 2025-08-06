const bcrypt = require("bcrypt");
const userModel = require("../models/UserModal");
const {
  successResponse,
  errorResponse,
  messageOnlyResponse,
} = require("../utils/responseFormatter");

// ✅ Create user
exports.createUser = async (req, res) => {
  try {
    const {
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
      business_name,
    } = req.body;

    if (!password || typeof password !== "string") {
      return res.json(
        errorResponse("Password is required and must be a string", 400)
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await userModel.createUser({
      username,
      email,
      password: hashedPassword,
      phone_number,
      address,
      birth_date,
      marital_status,
      cv,
      position_title,
      level_id,
      business_name,
    });

    res.json(messageOnlyResponse(201,"User created successfully"));
  } catch (error) {
    console.error("User creation error:", error);
    res.json(errorResponse("User creation failed", 500));
  }
};

// ✅ Get all users
exports.getAllUsers = async (req, res) => {
  const { businessName } = req.body;

  try {
    const users = await userModel.getAllUsers(businessName);
    res.json(successResponse({ userList: Array.isArray(users) ? users : [] }));
  } catch (error) {
    console.error("Fetch users error:", error);
    res.json(errorResponse("Failed to fetch users", 500));
  }
};

// ✅ Update user
exports.updateUser = async (req, res) => {
  try {
    const {
      userId,
      username,
      email,
      password,
      phone_number,
      address,
      birth_date,
      marital_status,
      cv,
      position_title,
    } = req.body;

    const updateData = {
      ...(username && { UserName: username }),
      ...(email && { Email: email }),
      ...(phone_number && { PhoneNumber: phone_number }),
      ...(address && { Address: address }),
      ...(birth_date && { BirthDate: birth_date }),
      ...(marital_status && { MaritalStatus: marital_status }),
      ...(cv && { CV: cv }),
      ...(position_title && { PositionsTitle: position_title }),
    };

    if (password) {
      updateData.Password = await bcrypt.hash(password, 10);
    }

    const updated = await userModel.updateUser(userId, updateData);
    if (!updated) {
      return res.json(errorResponse("User not found", 404));
    }

    res.json(messageOnlyResponse("User updated successfully", 200));
  } catch (error) {
    console.error("Update user error:", error);
    res.json(errorResponse("Failed to update user", 500));
  }
};

// ✅ Delete user
exports.deleteUser = async (req, res) => {
  try {
    const userId = parseInt(req.params.userId);

    if (!userId || isNaN(userId)) {
      return res.json(errorResponse("Invalid userId", 400));
    }

    const deleted = await userModel.deleteUser(userId);
    if (!deleted) {
      return res.json(errorResponse("User not found", 404));
    }

    res.json(messageOnlyResponse("User deleted successfully", 200));
  } catch (error) {
    console.error("Delete user error:", error);
    res.json(errorResponse("Failed to delete user", 500));
  }
};
