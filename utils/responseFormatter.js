// utils/responseFormatter.js

const successResponse = (data = {}, message = "Success", code = 200) => ({
  baseResponseModel: {
    respCode: code,
    respMessage: message,
  },
  ...data,
});

const errorResponse = (message = "Something went wrong", code = 500, data = {}) => ({
  baseResponseModel: {
    respCode: code,
    respMessage: message,
  },
  ...data,
});

// ✅ NEW: Use when you want ONLY code/message
const messageOnlyResponse = (respCode, respMessage) => ({
  baseResponseModel: {
    respCode,
    respMessage,
  }
});

module.exports = {
  successResponse,
  errorResponse,
  messageOnlyResponse,
};
